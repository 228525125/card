package org.cx.card.command.Validator;

import org.cx.card.domain.User;
import org.cx.game.tools.I18n;
import org.cx.game.validator.Validator;

/**
 * 用户是否已创建了主机
 * @author chenxian
 *
 */
public class HostOfUserExistedValidator extends Validator {
	
	private User user = null;

	public HostOfUserExistedValidator(User user) {
		// TODO Auto-generated constructor stub
		this.user = user;
	}
	
	@Override
	public Boolean validate() {
		// TODO Auto-generated method stub
		Boolean ret = null!=this.user.getHost();
		
		if(!ret){
			addMessage(I18n.getMessage(HostOfUserExistedValidator.class.getName()));
			ret = false;
		}
		
		return ret;
	}
	
	public static void main(String[] args) {
		System.out.println(HostOfUserExistedValidator.class.getName());
		System.out.println(I18n.getMessage(HostOfUserExistedValidator.class.getName()));
	}
}
