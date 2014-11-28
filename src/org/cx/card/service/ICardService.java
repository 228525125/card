package org.cx.card.service;

import java.io.Serializable;
import java.util.List;

import org.cx.card.domain.Card;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.web.tools.IPageList;

public interface ICardService {

	/**
	 * 保存一个Card，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addCard(Card instance);
	
	/**
	 * 根据一个ID得到Card
	 * 
	 * @param id
	 * @return
	 */
	Card getCard(Long id);
	
	/**
	 * 删除一个Card
	 * @param id
	 * @return
	 */
	boolean delCard(Long id);
	
	/**
	 * 批量删除Card
	 * @param ids
	 * @return
	 */
	boolean batchDelCards(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到Card
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getCardBy(IQueryObject queryObject);
	
	/**
	  * 更新一个Card
	  * @param id 需要更新的Card的id
	  * @param dir 需要更新的Card
	  */
	boolean updateCard(Long id,Card instance);
}
