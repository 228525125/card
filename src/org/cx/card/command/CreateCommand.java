package org.cx.card.command;

import javax.servlet.ServletContext;

import org.cx.card.command.Validator.RepeatCreateValidator;
import org.cx.card.domain.User;
import org.cx.game.command.ExternalCommand;
import org.cx.game.core.IPlayer;
import org.cx.game.exception.ValidatorException;
import org.cx.game.tools.Util;
import org.cx.game.widget.GroundDecorator;
import org.cx.game.widget.GroundFactory;
import org.cx.game.widget.ICamp;
import org.cx.game.widget.IGround;

import com.easyjf.web.ActionContext;

public class CreateCommand extends ExternalCommand {

	private IPlayer player = null;
	private ServletContext context = ActionContext.getContext().getSession().getServletContext();
	
	public CreateCommand(IPlayer player) {
		// TODO Auto-generated constructor stub
		this.player = player;
		addValidator(new RepeatCreateValidator(context,((User)player).getAccount()));
	}

	@Override
	public void execute(Object parameter) throws ValidatorException {
		// TODO Auto-generated method stub
		super.execute(parameter);
		
		IGround ground = GroundFactory.getInstance("test");
		
		player.setGround(ground);
		player.setId(1);                       //硬编码
		
		ground.setPlayerToCamp(0, player);     //硬编码
		
		context.setAttribute(parameter.toString(), player);
	}
}
