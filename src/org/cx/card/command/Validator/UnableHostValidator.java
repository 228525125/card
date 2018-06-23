package org.cx.card.command.Validator;

import javax.servlet.ServletContext;

import org.cx.game.core.AbstractHost;
import org.cx.game.tools.I18n;
import org.cx.game.validator.Validator;

public class UnableHostValidator extends Validator {

	private ServletContext context = null;
	private String hostName = null;
	private AbstractHost host = null;
	
	public UnableHostValidator(ServletContext context, String hostName) {
		// TODO Auto-generated constructor stub
		this.context = context;
		this.hostName = hostName;
	}
	
	@Override
	public Boolean validate() {
		// TODO Auto-generated method stub
		if(null!=context.getAttribute(hostName)){
			this.host = (AbstractHost) context.getAttribute(hostName);
			return true;
		}else{
			addMessage(I18n.getMessage(this));
			return false;
		}
	}
	
	protected AbstractHost getHost() {
		return host;
	}
}
