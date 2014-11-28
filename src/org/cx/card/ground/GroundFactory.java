package org.cx.card.ground;

import org.cx.game.widget.Camp;
import org.cx.game.widget.Ground;
import org.cx.game.widget.GroundDecorator;
import org.cx.game.widget.IGround;
import org.cx.game.widget.IPlace;
import org.cx.game.widget.Place;

public class GroundFactory {

	public static IGround getSimpleGround(){
		IGround simpleGround = new Ground();
		simpleGround = new GroundDecorator(simpleGround);
		
		/*
		 * 初始化坐标
		 */
		simpleGround.setBorder(15, 15);         
		for(int i=1;i<simpleGround.getXMax()+1;i++){
			for(int j=1;j<simpleGround.getYMax()+1;j++){
				Integer curPos = Integer.valueOf(""+i+"1001"+j);
				IPlace place = new Place(simpleGround, curPos);
				simpleGround.addPlace(place);
			}
		}
		
		/*
		 * 添加营地
		 */
		simpleGround.addCamp(new Camp(8000,0,simpleGround.getPlace(110018)));
		simpleGround.addCamp(new Camp(8000,0,simpleGround.getPlace(1510018)));
		
		return simpleGround;
	}
}
