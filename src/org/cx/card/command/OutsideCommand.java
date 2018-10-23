package org.cx.card.command;

import org.cx.card.domain.User;
import org.cx.game.command.Command;

public class OutsideCommand extends Command {
	
	private User user = null;
	private CommandBuffer buffer = null;
	
	public OutsideCommand(User user) {
		// TODO Auto-generated constructor stub
		this.user = user;
		this.buffer = user.getBuffer();
	}
	
	public User getUser() {
		return user;
	}
	
	public CommandBuffer getBuffer() {
		return buffer;
	}

}
