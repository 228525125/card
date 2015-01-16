package org.cx.card.command;

import javax.servlet.ServletContext;

import org.cx.card.command.Validator.UnableHostValidator;
import org.cx.card.domain.User;
import org.cx.game.command.ExternalCommand;
import org.cx.game.core.Context;
import org.cx.game.core.ContextFactory;
import org.cx.game.core.IContext;
import org.cx.game.core.IPlayer;
import org.cx.game.exception.ValidatorException;
import org.cx.game.widget.ICamp;
import org.cx.game.widget.IGround;

import com.easyjf.web.ActionContext;

public class JoinCommand extends ExternalCommand {

	private IPlayer player = null;
	private ServletContext context = ActionContext.getContext().getSession().getServletContext();
	
	public JoinCommand(IPlayer player) {
		// TODO Auto-generated constructor stub
		this.player = player;		
	}

	@Override
	public void execute(Object parameter) throws ValidatorException {
		// TODO Auto-generated method stub
		addValidator(new UnableHostValidator(context, parameter.toString()));
		
		super.execute(parameter);
		
		User user1 = (User) context.getAttribute(parameter.toString());
		User user2 = (User) player;
		
		context.setAttribute(parameter.toString(), null);
		
		IGround ground = user1.getGround();
		
		user2.setGround(ground);
		user2.setId(2);                           //硬编码
		
		ground.setPlayerToCamp(1, user2);         //硬编码
		
		IContext ctx = ContextFactory.createContext(user1, user2);
		context.setAttribute(user1.getAccount(), ctx);
		context.setAttribute(user2.getAccount(), ctx);
		
		/*if(null!=context.getAttribute(parameter.toString())){
			User user1 = (User) context.getAttribute(parameter.toString());
			User user2 = (User) player;
			
			context.setAttribute(parameter.toString(), null);
			
			IGround ground = user1.getGround();
			ICamp camp = ground.getPlace(1510018).getCamp();       //硬编码
			
			user2.setGround(ground);
			user2.setId(2);
			camp.setPlayer(user2);
			
			Context ctx = ContextFactory.createContext(user1, user2);
			context.setAttribute(user1.getAccount(), ctx);
			context.setAttribute(user2.getAccount(), ctx);
		}else{
			//throw new CommandException("没有找到主机！");
			User user2 = new User();
			user2.setAccount("npc");
			user2.setName("NPC");
			user2.setId(2);
			if(null!=context.getAttribute(user2.getAccount()))
				throw new ValidatorException("不能重复创建！"); 
			
			IGround ground = new SimpleGround();      //硬编码
			ground = new GroundDecorator(ground);
			ICamp camp = ground.getPlace(1510018).getCamp();      //硬编码
			
			user2.setGround(ground);
			camp.setPlayer(user2);
			
			User user1 = (User) player;
			
			context.setAttribute(parameter.toString(), null);
			
			camp = ground.getPlace(110018).getCamp();       //硬编码
			
			user1.setGround(ground);
			user1.setId(1);
			camp.setPlayer(user1);
			
			Context ctx = ContextFactory.createContext(user1, user2);
			context.setAttribute(user1.getAccount(), ctx);
			context.setAttribute(user2.getAccount(), ctx);
			
		}*/
	}
}
