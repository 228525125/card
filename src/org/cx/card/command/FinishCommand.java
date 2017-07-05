package org.cx.card.command;

import javax.servlet.ServletContext;

import org.cx.card.domain.User;
import org.cx.game.command.ExternalCommand;
import org.cx.game.core.Context;
import org.cx.game.core.IPlayer;
import org.cx.game.exception.ValidatorException;

import com.easyjf.web.ActionContext;

public class FinishCommand extends ExternalCommand {
	
	private IPlayer player = null;
	private ServletContext context = ActionContext.getContext().getSession().getServletContext();
	
	public FinishCommand(IPlayer player) {
		// TODO Auto-generated constructor stub
		this.player = player;
	}

	@Override
	public void execute(Object parameter) throws ValidatorException {
		// TODO Auto-generated method stub
		super.execute(parameter);
		
		Context ctx = (Context) player.getContext();
		
		IPlayer player1 = ctx.getPlayer1();
		IPlayer player2 = ctx.getPlayer2();
		ctx.finish();
		
		context.setAttribute(player1.getName(), null);
		context.setAttribute(player2.getName(), null);
	}
}
