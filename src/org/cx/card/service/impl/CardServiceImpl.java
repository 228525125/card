package org.cx.card.service.impl;

import java.io.Serializable;
import java.util.List;

import org.cx.card.dao.ICardDAO;
import org.cx.card.domain.Card;
import org.cx.card.service.ICardService;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;

public class CardServiceImpl implements ICardService {

private ICardDAO cardDao;
	
	public void setCardDao(ICardDAO CardDao){
		this.cardDao=CardDao;
	}
	
	public Long addCard(Card Card) {	
		this.cardDao.save(Card);
		if (Card != null && Card.getId() != null) {
			return Card.getId();
		}
		return null;
	}
	
	public Card getCard(Long id) {
		Card Card = this.cardDao.get(id);
		return Card;
		}
	
	public boolean delCard(Long id) {	
			Card Card = this.getCard(id);
			if (Card != null) {
				this.cardDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelCards(List<Serializable> CardIds) {
		
		for (Serializable id : CardIds) {
			delCard((Long) id);
		}
		return true;
	}
	
	public IPageList getCardBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, Card.class,this.cardDao);		
	}
	
	public boolean updateCard(Long id, Card Card) {
		if (id != null) {
			Card.setId(id);
		} else {
			return false;
		}
		this.cardDao.update(Card);
		return true;
	}	

}
