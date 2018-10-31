package org.cx.card.command;

import org.cx.card.command.validator.TypeOfHostValidator;
import org.cx.card.domain.User;
import org.cx.game.core.AbstractHost;
import org.cx.game.core.SceneHost;
import org.cx.game.exception.ValidatorException;
import org.cx.card.command.validator.HostStatusValidator;

public class GoCommand extends OutsideCommand {

	public GoCommand(User user) {
		// TODO Auto-generated constructor stub
		super(user);
		addValidator(new TypeOfHostValidator(SceneHost.class, user.getHost()));
		addValidator(new HostStatusValidator(AbstractHost.Status_WaitDeploy, user.getHost()));
	}
	
	@Override
	public void execute() throws ValidatorException {
		// TODO Auto-generated method stub
		super.execute();
		
		SceneHost host = (SceneHost) getUser().getHost();
		host.go(getUser().getPlayer());
	}
}
