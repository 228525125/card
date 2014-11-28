package org.cx.card.mvc;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.cx.game.command.Invoker;
import org.cx.game.exception.ValidatorException;
import org.cx.game.tools.Util;
import org.cx.card.command.CreateCommand;
import org.cx.card.command.FinishCommand;
import org.cx.card.command.JoinCommand;
import org.cx.card.domain.Process;
import org.cx.card.service.IProcessService;
import org.cx.card.service.JDBCQueryService;

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
		if(null!=getUser()){
			form.addResult("user", getUser().getAccount());
			form.addPo(getUser());
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
			msg = command +"-"+ msg;
			try {
				Invoker invoker = new Invoker();
				String response;
				if(-1!=command.indexOf("create"))
					response = invoker.receiveCommand(command, new CreateCommand(getUser()));
				else if(-1!=command.indexOf("join"))
					response = invoker.receiveCommand(command, new JoinCommand(getUser()));
				else if(-1!=command.indexOf("finish"))
					response = invoker.receiveCommand(command, new FinishCommand(getUser()));
				else
					response = invoker.receiveCommand(getUser(), command);
				
				if(!"".equals(response)&&0<response.split(";").length){
					String[] resps = response.split(";");
					String playNo = getUser().getContext().getPlayNo();
					Integer sequence = processService.getNewSequence(playNo);
					for(int i=0;i<resps.length;i++){
						Process p = new Process();
						p.setPlayNo(playNo);
						p.setCommand(resps[i]);
						p.setSequence(sequence+i);
						p.setPlayerId(getUser().getId());
						String action = resps[i].split("\",")[0].substring(11);
						p.setAction(action);
						list.add(p);
						
						processService.addProcess(p);
					}
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
		if(null!=getUser()
		&&null!=getUser().getContext()
		&&null!=form.get("sequence")
		&&!"".equals(form.get("sequence").toString())){
			sequence = Integer.valueOf(form.get("sequence").toString());
			list = jdbcService.query("select sequence,command from cprocess where playNo='"+getUser().getContext().getPlayNo()+"' and sequence>="+sequence+" order by sequence");
		}
		
		msg += sequence;
		
		return success(form, true, list, msg);
	}
}
