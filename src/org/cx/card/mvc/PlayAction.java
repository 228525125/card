package org.cx.card.mvc;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.PropertyUtils;
import org.cx.game.command.Invoker;
import org.cx.game.core.Camera;
import org.cx.game.core.Record;
import org.cx.game.exception.ValidatorException;
import org.cx.game.tools.PropertiesUtil;
import org.cx.game.tools.Util;
import org.cx.card.domain.Process;
import org.cx.card.service.IProcessService;
import org.cx.card.service.JDBCQueryService;
import org.cx.card.util.Tools;

import com.easyjf.container.annonation.Inject;
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
			return page("index");
		}else{
			return forward("login", "user");
		}
	}
	
	public Page send(WebForm form){
		getUser().getHost();
		form.addResult("user", getUser().getAccount());
		String msg = "complete";
		List<Process> list = new ArrayList<Process>();
		if(null!=form.get("command")&&!"".equals(form.get("command").toString())){
			String command = form.get("command").toString();
			Camera camera = Camera.getInstance();
			msg = command +" "+ msg;
			//String response = "";
			try {
				if(-1!=command.indexOf("create")
				|| -1!=command.indexOf("join")
				|| -1!=command.indexOf("ready")
				|| -1!=command.indexOf("deploy")
				|| -1!=command.indexOf("go")
				|| -1!=command.indexOf("finish")){
					org.cx.card.command.Invoker oInvoker = new org.cx.card.command.Invoker();
					oInvoker.receiveCommand(getUser(), command);
					//response = oInvoker.getResponse();
				}else{
					Integer sequence = 0;
					String playNo = getUser().getHost().getPlayNo();
					
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
					
					Invoker iInvoker = new Invoker(playNo);
					iInvoker.receiveCommand(getUser().getPlayer(), command);
					//response = iInvoker.getResponse();
					
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
			
			/*
			if(!"".equals(response)&&0<response.split(";").length){
				String[] resps = response.split(";");
				String playNo = getUser().getHost().getPlayNo();
				Integer sequence = processService.getNewSequence(playNo);
				
				
				for(int i=1;i<=resps.length;i++){
					Process p = new Process();
					p.setPlayNo(playNo);
					p.setResponse(resps[i]);
					p.setSequence(sequence+i);
					p.setExecutor(getUser().getPlayer().getTroop());
					String action = resps[i].split("\",")[0].substring(11);
					p.setAction(action);
					list.add(p);
				}
			}*/
		}

		return success(form, true, list, msg);
	}
	
	public Page syn(WebForm form){
		String msg = Util.format(new Date())+"  syn-complete start:";		
		
		List<Process> list = new ArrayList<Process>();
		Integer sequence = 0;
		if(null!=getUser()
		&&null!=getUser().getHost()
		&&null!=form.get("sequence")
		&&!"".equals(form.get("sequence").toString())){
			String playNo = getUser().getHost().getPlayNo();
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
