package org.cx.card.command;

import org.cx.card.domain.User;
import org.cx.game.command.Command;
import org.cx.game.command.expression.Calculator;
import org.cx.game.core.Camera;
import org.cx.game.core.IPlayer;
import org.cx.game.core.Record;
import org.cx.game.exception.SyntaxValidatorException;
import org.cx.game.exception.ValidatorException;

public class Invoker {

	private Command command;
	private String response = "";

	private void setCommand(Command command) {
		this.command = command;
	}
	
	private void action() throws ValidatorException {
		this.command.execute();
	}
	
	public String getResponse() {		
		return response;
	}

	/*
	 * 把执行中观察的结果反馈给前台
	
	private void response(){
		response = Response.process.get().toString();
		Response.process.get().delete(0, Response.process.get().length());
		
		record();
	}
	
	private void record(){
		Camera camera = Camera.getInstance();
		
		if(!"".equals(response) && 0<response.split(";").length){
			String[] resps = response.split(";");
			
			Integer sequence = camera.getNewSequence();
			for(int i=0;i<resps.length;i++){
				Record r = new Record();
				r.setPlayNo(playNo);
				r.setCommand(resps[i]);
				r.setSequence(sequence+i);
				String action = resps[i].split("\",")[0].substring(11);
				r.setAction(action);
				
				camera.addRecord(r);
			}
		}
	} */
	
	private void intergrityValidate(String cmd) throws SyntaxValidatorException {
		String[] cs = cmd.split(Calculator.SPACE);
		if(cs.length==0)
			throw new SyntaxValidatorException("org.cx.game.command.Invoker.intergrityValidate");
	}

	public void receiveCommand(User user, String cmd) throws ValidatorException {
		try {
			intergrityValidate(cmd);    //验证命令完整性
		
			for(String c : cmd.split(";")){
				OutsideCommand command = CommandFactory.getInstance(user, c);
				//command.setExternal(external);
				setCommand(command);
				action();
			}
		} catch (ValidatorException e) {
			// TODO: handle exception
			throw e;
		} finally {
			//response();
		}
	}
}
