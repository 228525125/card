package org.cx.card.command;

import java.util.HashMap;
import java.util.Map;

import org.cx.card.command.validator.HostOfUserExistedValidator;
import org.cx.card.domain.User;
import org.cx.game.core.AbstractHost;
import org.cx.game.exception.ValidatorException;
import org.cx.game.observer.NotifyInfo;
import org.cx.game.tools.CommonIdentifierE;
import org.cx.card.command.validator.HostStatusValidator;
import org.cx.game.widget.Ground;

public class ReadyCommand extends OutsideCommand {
	
	public ReadyCommand(User user) {
		// TODO Auto-generated constructor stub
		super(user);
		
		addValidator(new HostOfUserExistedValidator(user));
		addValidator(new HostStatusValidator(AbstractHost.Status_WaitReady, user.getHost()));
	}
	
	@Override
	public void execute() throws ValidatorException {
		// TODO Auto-generated method stub
		super.execute();
		
		getUser().getHost().ready();
		
		Map<String,Object> map = new HashMap<String,Object>();
		Ground ground = getUser().getHost().getGround();

		map.put("ground", ground);
		NotifyInfo info = new NotifyInfo(CommonIdentifierE.Command_Ready,map);
		super.notifyObservers(info);
	}
}
