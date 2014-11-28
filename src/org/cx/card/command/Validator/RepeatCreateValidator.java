package org.cx.card.command.Validator;

import javax.servlet.ServletContext;

import org.cx.game.tools.I18n;
import org.cx.game.validator.Validator;

public class RepeatCreateValidator extends Validator {

	private ServletContext context = null;
	private String host = null;
	
	public RepeatCreateValidator(ServletContext context, String host) {
		// TODO Auto-generated constructor stub
		this.context = context;
		this.host = host;
	}
	
	@Override
	public Boolean validate() {
		// TODO Auto-generated method stub
		if(null==context.getAttribute(host))
			return true;
		else{
			addMessage(I18n.getMessage(this));
			return false;
		}
	}
}
