package org.cx.card.command.expression;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.cx.card.command.OutsideCommand;
import org.cx.card.domain.User;
import org.cx.game.command.Command;
import org.cx.game.command.CommandBuffer;
import org.cx.game.command.InteriorCommand;
import org.cx.game.command.expression.ParameterExpression;
import org.cx.game.core.IPlayer;
import org.cx.game.exception.SyntaxValidatorException;
import org.cx.game.tools.I18n;
import org.cx.game.tools.PropertiesUtil;
import org.cx.game.tools.XmlUtil;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class OutsideCalculator {
	
	//private static final String filePath = "/org/cx/game/command/command.xml";
	public static final String SPACE = " ";
	
	private static Element getRoot() {
		SAXReader saxReader = new SAXReader();
		//InputStream is=Calculator.class.getResourceAsStream(filePath);		
		
		try {
			InputStream is = new BufferedInputStream(new FileInputStream(PropertiesUtil.getConfigure("command.path")));
			Document document = saxReader.read(is);
			return document.getRootElement();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
	
	public OutsideCommand parseForCommand(User user, String cmd) throws SyntaxValidatorException {		
		Element root = getRoot();
		OutsideCommand command = null;
		
		OutsideCommandExpression commandExpriession = new OutsideCommandExpression(user, cmd, root);   //默认第一个字段为command
		command = commandExpriession.interpreter();

		if(commandExpriession.getParamRequest()){
			ParameterExpression parameterExpression = new OutsideCommandParameterExpression(cmd, commandExpriession.getElement()); //默认第二个字段为参数
			Object parameter = parameterExpression.interpreter();
			command.setParameter(parameter);
		}
		return command;
	}
	
	private void intergrityValidate(String cmd) throws SyntaxValidatorException {
		String[] cs = cmd.split(SPACE);
		if(cs.length==0)
			throw new SyntaxValidatorException("org.cx.game.command.parse.Calculator.intergrityValidate");
	}
	
	/**
	 * 根据xml描述将item转换为type
	 * @param item
	 * @return type
	 */
	public static String itemToType(String item){
		Element root = getRoot();
		Element types = root.element(XmlUtil.Command_Types);
		for(Iterator<Element> it = types.elementIterator(XmlUtil.Command_Type);it.hasNext();){
			Element type = it.next();
			String typeName = type.attribute(XmlUtil.Command_Type_Name).getText();
			for(Iterator<Element> iter = type.elementIterator(XmlUtil.Command_Item);iter.hasNext();){
				Element el = iter.next();
				if(el.getText().equals(item))
					return typeName;
			}
		}
		return null;
	} 
}
