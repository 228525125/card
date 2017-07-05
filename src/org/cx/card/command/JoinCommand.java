package org.cx.card.command;

import javax.servlet.ServletContext;

import org.cx.card.command.Validator.UnableHostValidator;
import org.cx.card.domain.User;
import org.cx.game.card.CardFactory;
import org.cx.game.card.LifeCard;
import org.cx.game.command.ExternalCommand;
import org.cx.game.core.Context;
import org.cx.game.core.ContextFactory;
import org.cx.game.core.IContext;
import org.cx.game.core.IPlayer;
import org.cx.game.core.Player;
import org.cx.game.core.PlayerDecorator;
import org.cx.game.exception.ValidatorException;
import org.cx.game.widget.IGround;

import com.easyjf.web.ActionContext;

public class JoinCommand extends ExternalCommand {

	private User user = null;
	private ServletContext context = ActionContext.getContext().getSession().getServletContext();
	
	public JoinCommand(User user) {
		// TODO Auto-generated constructor stub
		this.user = user;		
	}

	@Override
	public void execute(Object parameter) throws ValidatorException {
		// TODO Auto-generated method stub
		addValidator(new UnableHostValidator(context, parameter.toString()));
		
		super.execute(parameter);
		
		IPlayer player1 = (IPlayer) context.getAttribute(parameter.toString());
		IPlayer player2 = new Player(2, user.getAccount());     //硬编码
		player2 = new PlayerDecorator(player2);
		
		context.setAttribute(parameter.toString(), null);
		
		IGround ground = player1.getGround();

		player2.setGround(ground);
		player2.setHeroEntry(20800811);             //硬编码
		player2.setHeroCardID(10190002);            //硬编码
		player2.setResource(1000);                  //硬编码
		
		user.setPlayer(player2);
		
		ground.captureBuilding(20800811, player2);         //硬编码
		
		IContext ctx = ContextFactory.createContext(player1, player2);
		context.setAttribute(player1.getName(), ctx);
		context.setAttribute(player2.getName(), ctx);
	}
}
