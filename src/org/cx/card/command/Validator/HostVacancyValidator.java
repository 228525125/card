package org.cx.card.command.Validator;

import javax.servlet.ServletContext;

import org.cx.game.tools.I18n;

/**
 * 验证主机是否还有空位
 * @author chenxian
 *
 */
public class HostVacancyValidator extends UnableHostValidator {

	public HostVacancyValidator(ServletContext context, String host) {
		// TODO Auto-generated constructor stub
		super(context, host);
	}
	
	@Override
	public Boolean validate() {
		// TODO Auto-generated method stub
		Boolean ret = super.validate();
		
		if(ret){
			if(null==getHost().getUsableTroop()){
				ret = false;
				addMessage(I18n.getMessage(this));
			}
		}
		
		return ret;
	}
}
