package org.cx.card.command;

import javax.servlet.ServletContext;

import org.cx.game.core.Context;
import org.cx.game.core.IPlayer;
import org.cx.game.exception.ValidatorException;

import com.easyjf.web.ActionContext;

public class FinishCommand extends OutsideCommand {
	
	private IPlayer player = null;
	private ServletContext context = ActionContext.getContext().getSession().getServletContext();
	
	public FinishCommand(IPlayer player) {
		// TODO Auto-generated constructor stub
		this.player = player;
	}

	@Override
	public void execute() throws ValidatorException {
		// TODO Auto-generated method stub
		super.execute();
		
		Context ctx = (Context) player.getContext();
		
		for(IPlayer player : ctx.getPlayerList()){
			context.setAttribute(player.getName(), null);			
		}

		ctx.finish();
	}
}
