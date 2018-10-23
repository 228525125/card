package org.cx.card.command;

import javax.servlet.ServletContext;

import org.cx.card.domain.User;
import org.cx.game.core.AbstractPlayer;
import org.cx.game.core.Context;
import org.cx.game.exception.ValidatorException;

import com.easyjf.web.ActionContext;

/**
 * 没有使用
 * @author 陈贤
 *
 */
public class FinishCommand extends OutsideCommand {
	
	private ServletContext context = ActionContext.getContext().getSession().getServletContext();
	
	public FinishCommand(User user) {
		// TODO Auto-generated constructor stub
		super(user);
	}

	@Override
	public void execute() throws ValidatorException {
		// TODO Auto-generated method stub
		super.execute();
		
		/*Context ctx = (Context) player.getContext();
		
		for(AbstractPlayer player : ctx.getPlayerList()){
			context.setAttribute(player.getName(), null);			
		}

		ctx.finish();*/
	}
}
