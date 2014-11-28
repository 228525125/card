package org.cx.card.mvc;

import org.cx.card.domain.Process;
import org.cx.card.service.IProcessService;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;


/**
 * ProcessAction
 * @author EasyJWeb 1.0-m2
 * $Id: ProcessAction.java,v 0.0.1 2014-3-3 22:52:04 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
public class ProcessAction extends BaseAction {
	
	@Inject
	private IProcessService service;
	/*
	 * set the current service
	 * return service
	 */
	public void setService(IProcessService service) {
		this.service = service;
	}
	
	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = service.getProcessBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delProcess(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		Process object = form.toPo(Process.class);
		if (!hasErrors())
			service.addProcess(object);
		return pageForExtForm(form);
	}
	
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		Process object = service.getProcess(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateProcess(id, object);
		return pageForExtForm(form);
	}
}