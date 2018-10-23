package org.cx.card.command;

import java.util.HashMap;
import java.util.Map;

import org.cx.card.command.validator.TypeOfHostValidator;
import org.cx.card.domain.User;
import org.cx.game.core.AbstractHost;
import org.cx.game.core.SceneHost;
import org.cx.game.exception.ValidatorException;
import org.cx.game.observer.NotifyInfo;
import org.cx.game.tools.CommonIdentifierE;
import org.cx.game.validator.HostStatusValidator;
import org.cx.game.widget.Ground;
import org.cx.game.widget.HoneycombGround;

public class DeployCommand extends OutsideCommand {
	
	public DeployCommand(User user) {
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
		host.deploy(getUser().getPlayer());
		
		Map<String,Object> map = new HashMap<String,Object>();

		map.put("ground", host.getGround());
		NotifyInfo info = new NotifyInfo(CommonIdentifierE.Command_Deploy,map);
		super.notifyObservers(info);
	}
}
