package org.cx.card.command.Validator;

import org.cx.game.core.AbstractHost;
import org.cx.game.tools.I18n;
import org.cx.game.validator.Validator;

public class HostIsReadyValidator extends Validator {

	private AbstractHost host = null;
	
	public HostIsReadyValidator(AbstractHost host) {
		// TODO Auto-generated constructor stub
		this.host = host;
	}
	
	@Override
	public Boolean validate() {
		// TODO Auto-generated method stub
		if(this.host.isReady()){
			return true;
		}else{
			addMessage(I18n.getMessage(this));
			return false;
		}
	}
}
