package org.cx.card.command;

import javax.servlet.ServletContext;

import org.cx.card.command.Validator.RepeatCreateValidator;
import org.cx.card.domain.User;
import org.cx.game.core.AbstractHost;
import org.cx.game.core.AreaHost;
import org.cx.game.exception.ValidatorException;

import com.easyjf.web.ActionContext;

public class CreateCommand extends OutsideCommand {

	private User user = null;
	private ServletContext context = ActionContext.getContext().getSession().getServletContext();
	
	public CreateCommand(User user) {
		// TODO Auto-generated constructor stub
		this.user = user;
		addValidator(new RepeatCreateValidator(context,user.getAccount()));
	}

	@Override
	public void execute() throws ValidatorException {
		// TODO Auto-generated method stub
		super.execute();
		
		AbstractHost host = new AreaHost(106001, user.getAccount());        //硬编码
		host.setHeroOfPlayer(10190001, user.getAccount());
		user.setHost(host);
		context.setAttribute(parameter.toString(), host);
	}
}
