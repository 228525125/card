package org.cx.card.command;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.cx.card.command.Validator.RepeatCreateValidator;
import org.cx.card.domain.User;
import org.cx.game.card.CardFactory;
import org.cx.game.card.LifeCard;
import org.cx.game.command.ExternalCommand;
import org.cx.game.core.IPlayer;
import org.cx.game.core.Player;
import org.cx.game.exception.ValidatorException;
import org.cx.game.tools.Util;
import org.cx.game.widget.GroundFactory;
import org.cx.game.widget.IGround;
import org.cx.game.widget.treasure.IResource;

import com.easyjf.web.ActionContext;

public class CreateCommand extends ExternalCommand {

	private User user = null;
	private ServletContext context = ActionContext.getContext().getSession().getServletContext();
	
	public CreateCommand(User user) {
		// TODO Auto-generated constructor stub
		this.user = user;
		addValidator(new RepeatCreateValidator(context,user.getAccount()));
	}

	@Override
	public void execute(Object parameter) throws ValidatorException {
		// TODO Auto-generated method stub
		super.execute(parameter);
		
		IGround ground = GroundFactory.getInstance("test");
		
		IPlayer player = new Player(1, user.getAccount());   //硬编码
	
		//player.setGround(ground);
		player.setHomePosition(380082);           //硬编码
		player.addHeroCardID(10190001);        //硬编码
		//player.addToResource(IResource.Gold, 1000);              //硬编码
		
		ground.captureBuilding(380082, player);     //硬编码
		
		user.setPlayer(player);
		
		context.setAttribute(parameter.toString(), player);
		context.setAttribute(parameter+"Ground", ground);
	}
}
