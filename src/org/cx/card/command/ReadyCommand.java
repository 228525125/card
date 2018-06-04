package org.cx.card.command;

import org.cx.card.command.Validator.HostOfUserExistedValidator;
import org.cx.card.domain.User;
import org.cx.game.exception.ValidatorException;

public class ReadyCommand extends OutsideCommand {
	
	private User user = null;
	
	public ReadyCommand(User user) {
		// TODO Auto-generated constructor stub
		this.user = user;
		
		addValidator(new HostOfUserExistedValidator(user));
	}
	
	@Override
	public void execute() throws ValidatorException {
		// TODO Auto-generated method stub
		super.execute();
		
		this.user.getHost().ready();
	}
}
