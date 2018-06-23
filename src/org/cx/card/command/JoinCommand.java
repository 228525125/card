package org.cx.card.command;

import javax.servlet.ServletContext;

import org.cx.card.command.Validator.HostVacancyValidator;
import org.cx.card.domain.User;
import org.cx.game.core.AbstractHost;
import org.cx.game.exception.ValidatorException;

import com.easyjf.web.ActionContext;

public class JoinCommand extends OutsideCommand {

	private User user = null;
	private ServletContext context = ActionContext.getContext().getSession().getServletContext();
	
	public JoinCommand(User user) {
		// TODO Auto-generated constructor stub
		this.user = user;		
	}

	@Override
	public void execute() throws ValidatorException {
		// TODO Auto-generated method stub
		addValidator(new HostVacancyValidator(context, parameter.toString()));
		
		super.execute();
		
		AbstractHost host = (AbstractHost) context.getAttribute(parameter.toString());
		host.playerJoinGame(user.getAccount());
		host.setHeroOfPlayer(10190002, user.getAccount());
		user.setHost(host);
	}
}
