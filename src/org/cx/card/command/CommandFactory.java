package org.cx.card.command;

import org.cx.card.command.expression.OutsideCalculator;
import org.cx.card.domain.User;
import org.cx.game.exception.SyntaxValidatorException;

public class CommandFactory {
	
	public static OutsideCommand getInstance(User user, String cmd) throws SyntaxValidatorException{
		OutsideCalculator helper = new OutsideCalculator();
		return helper.parseForCommand(user, cmd);
	}
}
