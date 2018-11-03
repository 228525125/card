package org.cx.card.command;

import java.util.UUID;

import javax.servlet.ServletContext;

import org.cx.card.command.validator.RepeatCreateValidator;
import org.cx.card.domain.User;
import org.cx.game.core.SceneHost;
import org.cx.game.exception.ValidatorException;

import com.easyjf.web.ActionContext;

public class CreateCommand extends OutsideCommand {

	private ServletContext context = ActionContext.getContext().getSession().getServletContext();
	
	public CreateCommand(User user) {
		// TODO Auto-generated constructor stub
		super(user);
		addValidator(new RepeatCreateValidator(context,user.getAccount()));
	}

	@Override
	public void execute() throws ValidatorException {
		// TODO Auto-generated method stub
		super.execute();
		
		// AreaHost
		/*
		AbstractHost host = new AreaHost(106001, user.getAccount());        //硬编码
		host.setHeroOfPlayer(10190001, user.getAccount());
		user.setHost(host);
		context.setAttribute(parameter.toString(), host);*/
		
		//GroundHost
		String playNo = UUID.randomUUID().toString();
		
		SceneHost host = new SceneHost(107003, getUser().getAccount(), 1, playNo);
		host.setCorpsDataOfTroop(1,"[10100002,1,1];[10100003,1,1]"); //[10190001,1,1];
		getUser().setHost(host);
		context.setAttribute(parameter.toString(), host);
	}
}
