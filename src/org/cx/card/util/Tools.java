package org.cx.card.util;

import org.cx.game.tools.CellularDistrict;

public class Tools {

	public Integer getNo(Integer p1, Integer p2){
		return CellularDistrict.getSerialNumber(Integer.valueOf(p1.toString()+"8008"+p2));
	}
}
