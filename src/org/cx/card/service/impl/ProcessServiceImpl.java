package org.cx.card.service.impl;
import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;

import org.cx.card.domain.Process;
import org.cx.card.service.IProcessService;
import org.cx.card.dao.IProcessDAO;


/**
 * ProcessServiceImpl
 * @author EasyJWeb 1.0-m2
 * $Id: ProcessServiceImpl.java,v 0.0.1 2014-3-3 22:52:04 EasyJWeb 1.0-m2 Exp $
 */
public class ProcessServiceImpl implements IProcessService{
	
	private IProcessDAO processDao;
	
	public void setProcessDao(IProcessDAO processDao){
		this.processDao=processDao;
	}
	
	public Long addProcess(Process process) {	
		this.processDao.save(process);
		if (process != null && process.getId() != null) {
			return process.getId();
		}
		return null;
	}
	
	public Process getProcess(Long id) {
		Process process = this.processDao.get(id);
		return process;
		}
	
	public boolean delProcess(Long id) {	
			Process process = this.getProcess(id);
			if (process != null) {
				this.processDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelProcesss(List<Serializable> processIds) {
		
		for (Serializable id : processIds) {
			delProcess((Long) id);
		}
		return true;
	}
	
	public IPageList getProcessBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, Process.class,this.processDao);		
	}
	
	public boolean updateProcess(Long id, Process process) {
		if (id != null) {
			process.setId(id);
		} else {
			return false;
		}
		this.processDao.update(process);
		return true;
	}	
	
	@Override
	public Integer getNewSequence(String playNo) {
		// TODO Auto-generated method stub
		String sql = "select max(sequence) from Process p where p.playNo = '"+playNo+"'";
		List list = this.processDao.query(sql, null, 0, 1);
		if(list.isEmpty() || null == list.get(0))
			return 1;
		else{
			Integer  s = (Integer) list.get(0);
			return ++s;
		}
		
	}
	
}
