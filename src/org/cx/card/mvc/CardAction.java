package org.cx.card.mvc;

import org.cx.card.domain.Card;
import org.cx.card.service.ICardService;

import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.tools.IPageList;

public class CardAction extends BaseAction {

	@Inject
	private ICardService service;
	/*
	 * set the current service
	 * return service
	 */
	public void setService(ICardService service) {
		this.service = service;
	}
	
	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = service.getCardBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delCard(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		Card object = form.toPo(Card.class);
		if (!hasErrors())
			service.addCard(object);
		return pageForExtForm(form);
	}
	
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		Card object = service.getCard(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateCard(id, object);
		return pageForExtForm(form);
	}
}
