package org.cx.card.command;

import javax.servlet.ServletContext;

import org.cx.card.command.validator.HostVacancyValidator;
import org.cx.card.domain.User;
import org.cx.game.core.AbstractHost;
import org.cx.game.core.SceneHost;
import org.cx.game.exception.ValidatorException;

import com.easyjf.web.ActionContext;

public class JoinCommand extends OutsideCommand {

	private ServletContext context = ActionContext.getContext().getSession().getServletContext();
	
	public JoinCommand(User user) {
		// TODO Auto-generated constructor stub
		super(user);
	}

	@Override
	public void execute() throws ValidatorException {
		// TODO Auto-generated method stub
		addValidator(new HostVacancyValidator(context, parameter.toString()));
		
		super.execute();
		
		AbstractHost host = (AbstractHost) context.getAttribute(parameter.toString());
		Integer troop = host.getUsableTroop();
		host.playerJoinGame(getUser().getAccount(), troop);
		
		if (host instanceof SceneHost) {
			SceneHost sceneHost = (SceneHost) host;
			sceneHost.setCorpsDataOfTroop(troop, "[10190002,1,1,"+troop+"];[10100003,1,1,"+troop+"]");
		}
		
		host.setStatus(AbstractHost.Status_WaitReady);
		
		getUser().setHost(host);
	}
}
