package org.cx.card.command;

import org.cx.card.domain.User;
import org.cx.game.command.Command;
import org.cx.game.command.expression.Calculator;
import org.cx.game.core.Camera;
import org.cx.game.core.IPlayer;
import org.cx.game.core.Record;
import org.cx.game.exception.SyntaxValidatorException;
import org.cx.game.exception.ValidatorException;
import org.cx.game.tools.PropertiesUtil;

public class Invoker {

	private Command command;
	//private String response = "";

	private void setCommand(Command command) {
		this.command = command;
	}
	
	private void action() throws ValidatorException {
		this.command.execute();
	}
	
	/*public String getResponse() {		
		return response;
	}*/
	
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
			//外部命令用于创建主机，游戏场景并未创建，因此所有输出都无法正常显示
			//response();
		}
	}
}
