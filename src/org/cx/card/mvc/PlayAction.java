package org.cx.card.mvc;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.PropertyUtils;
import org.cx.game.command.CommandInvokerFactory;
import org.cx.game.command.IInvoker;
import org.cx.game.core.Camera;
import org.cx.game.core.Record;
import org.cx.game.exception.ValidatorException;
import org.cx.game.tools.PropertiesUtil;
import org.cx.game.tools.Util;
import org.cx.card.domain.Connect;
import org.cx.card.domain.Process;
import org.cx.card.service.IProcessService;
import org.cx.card.service.JDBCQueryService;
import org.cx.card.util.Tools;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.easyjf.container.annonation.Inject;
import com.easyjf.web.ActionContext;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;

public class PlayAction extends BaseAction {

	@Inject
	private IProcessService processService;
	
	public void setProcessService(IProcessService processService) {
		this.processService = processService;
	}
	
	@Inject
	private JDBCQueryService jdbcService;
	
	public void setJdbcService(JDBCQueryService jdbcService) {
		this.jdbcService = jdbcService;
	}

	public Page index(WebForm form){
		form.addResult("tools", new Tools());
		if(null!=getUser()){
			form.addResult("user", getUser().getAccount());
			form.addPo(getUser());
			
			/*
			 * 尝试去连接主机，并将playNo和troop保存起来，这里是为了处理掉线后的重连
			 */
			try {
				IInvoker invoker = CommandInvokerFactory.getInstance();
				invoker.receiveCommand("connect "+getUser().getAccount());
				String resp = invoker.getResponse();
				
				JSONParser parser = new JSONParser();
				
				JSONObject obj = (JSONObject) parser.parse(resp.toString().substring(0, resp.length()-1));
				JSONObject info = (JSONObject) obj.get("info");
				Boolean isExistedHost = new Boolean(info.get("isExistedHost").toString());
				if(isExistedHost){
					String playNo = info.get("playNo").toString();
					Integer troop = new Integer(info.get("troop").toString());
					Connect conn = new Connect();
					conn.setPlayNo(playNo);
					conn.setTroop(troop);
					ActionContext.getContext().getSession().setAttribute("conn", conn);
				}
			} catch (org.json.simple.parser.ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ValidatorException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			return page("index");
		}else{
			return forward("login", "user");
		}
	}
	
	public Page send(WebForm form){
		form.addResult("user", getUser().getAccount());
		String msg = "complete";
		List<Process> list = new ArrayList<Process>();
		if(null!=form.get("command")&&!"".equals(form.get("command").toString())){
			String command = form.get("command").toString();
			Camera camera = Camera.getInstance();
			msg = command +" "+ msg;

			String SPACE = " ";
			
			String action  = command.split(SPACE)[0];
			
			try {
				Integer sequence = 0;
				
				if(null!=form.get("sequence")&&!"".equals(form.get("sequence").toString())){
					/*
					 * 客户端sequence
					 */
					sequence = Integer.valueOf(form.get("sequence").toString());
					System.out.println("客户端sequence："+sequence);
					List<Record> recordList = camera.query(sequence);
					list.addAll(copyRecrodToProcess(recordList));
					/*
					 * 同步后的sequence
					 */
					sequence = camera.getLastSequence();
					System.out.println("同步后sequence："+sequence);
				}
				
				IInvoker invoker = null;
				Connect conn = (Connect) ActionContext.getContext().getSession().getAttribute("conn");
				
				if(null==conn){
					invoker = CommandInvokerFactory.getInstance();
					invoker.receiveCommand(command);
					String resp = invoker.getResponse();
					
					JSONParser parser = new JSONParser();

					try {
						JSONObject obj = (JSONObject) parser.parse(resp.toString().substring(0, resp.length()-1));
						JSONObject info = (JSONObject) obj.get("info");
						String playNo = info.get("playNo").toString();
						Integer troop = new Integer(info.get("troop").toString());
						
						conn = new Connect();
						conn.setPlayNo(playNo);
						conn.setTroop(troop);
						ActionContext.getContext().getSession().setAttribute("conn", conn);
					} catch (org.json.simple.parser.ParseException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
				}else{
					String playNo = conn.getPlayNo();
					Integer troop = conn.getTroop();
					invoker = CommandInvokerFactory.getInstance(playNo, troop);
					invoker.receiveCommand(command);
					
					/*
					 * 上面经过操作又产生了新的记录
					 */
					List<Record> recordList = camera.query(sequence);
					
					System.out.println("操作后sequence："+camera.getLastSequence());
					
					for(Process process : copyRecrodToProcess(recordList)){
						/*
						 * 这些新记录添加操作标记
						 */
						process.setSign(Process.Sign_Send);
						list.add(process);
					}
					
					updateProcess(playNo);
				}
				
			} catch (ValidatorException e) {
				// TODO Auto-generated catch block
				msg = e.getMessage();
			}
		}

		return success(form, true, list, msg);
	}
	
	public Page syn(WebForm form){		
		
		String msg = Util.format(new Date())+"  syn-complete start:";
		
		List<Process> list = new ArrayList<Process>();
		Integer sequence = 0;
		Connect conn = (Connect) ActionContext.getContext().getSession().getAttribute("conn");
		if(null!=conn
		&&null!=form.get("sequence")
		&&!"".equals(form.get("sequence").toString())){
			String playNo = conn.getPlayNo();
			updateProcess(playNo);
			
			sequence = Integer.valueOf(form.get("sequence").toString());
			String sql = "playNo='"+playNo+"' and sequence>="+sequence+" order by sequence";
			list = processService.query(sql, null, 0, 999);
		}
		
		for(Process p : list)
			p.setSign(Process.Sign_Syn);
		
		msg += sequence;
		
		return success(form, true, list, msg);
	}
	
	/**
	 * 将比赛进程更新到数据库
	 * @param playNo 比赛唯一标识
	 */
	private void updateProcess(String playNo){
		Camera camera = Camera.getInstance();
		
		Integer sequence = processService.getNewSequence(playNo);
		List<Record> list = camera.query(--sequence);
		
		System.out.println("同步到数据库的记录数："+list.size());
		
		for(Record record : list){
			Process process = new Process();
			try {
				PropertyUtils.copyProperties(process, record);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			processService.addProcess(process);
		}
	}
	
	private List<Process> copyRecrodToProcess(List<Record> recordList) {
		
		List<Process> processList = new ArrayList<Process>();
		
		for(int i=0; i<recordList.size(); i++){
			Record record = recordList.get(i);
			Process process = new Process();
			process.setAction(record.getAction());
			process.setExecutor(record.getExecutor());
			process.setPlayNo(record.getPlayNo());
			process.setResponse(record.getResponse());
			process.setSequence(record.getSequence());
			process.setSign(Process.Sign_Syn);
			processList.add(process);
		}
		
		return processList;
	}
	
	public static void main(String[] args) {
		String value = PropertiesUtil.getConfigure("area.path");
		System.out.println(value);
	}
}
