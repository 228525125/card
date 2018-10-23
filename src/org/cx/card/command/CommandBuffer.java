package org.cx.card.command;

import java.util.HashMap;
import java.util.Map;

import org.cx.card.domain.User;
import org.cx.game.widget.AbstractOption;

public class CommandBuffer {

	public static final String HOST = "host";
	public static final String OPTION = "option";
	
	private User user = null;
	
	private Map<String, Object> bufferMap = new HashMap<String, Object>();
	
	public CommandBuffer(User user) {
		// TODO Auto-generated constructor stub
		this.user = user;
		this.bufferMap.put(HOST, user.getHost());
	}
	
	public void set(Object object){

		if (object instanceof AbstractOption) {
			AbstractOption option = (AbstractOption) object;
			this.bufferMap.put(OPTION, option);
		}
	}
	
	public Object get(String item) {
		return this.bufferMap.get(item);
	}
	
	public void clear() {
		this.bufferMap.clear();
	}
	
	public AbstractOption getOption() {
		return (AbstractOption) get(OPTION);
	}
}
