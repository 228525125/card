package org.cx.card.service;

import java.io.Serializable;
import java.util.List;

import com.easyjf.web.tools.IPageList;
import com.easyjf.core.support.query.IQueryObject;

import org.cx.card.domain.Process;
/**
 * ProcessService
 * @author EasyJWeb 1.0-m2
 * $Id: ProcessService.java,v 0.0.1 2014-3-3 22:52:03 EasyJWeb 1.0-m2 Exp $
 */
public interface IProcessService {
	/**
	 * 保存一个Process，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addProcess(Process instance);
	
	/**
	 * 根据一个ID得到Process
	 * 
	 * @param id
	 * @return
	 */
	Process getProcess(Long id);
	
	/**
	 * 删除一个Process
	 * @param id
	 * @return
	 */
	boolean delProcess(Long id);
	
	/**
	 * 批量删除Process
	 * @param ids
	 * @return
	 */
	boolean batchDelProcesss(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到Process
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getProcessBy(IQueryObject queryObject);
	
	/**
	  * 更新一个Process
	  * @param id 需要更新的Process的id
	  * @param dir 需要更新的Process
	  */
	boolean updateProcess(Long id,Process instance);
	
	/**
	 * 获取最新的Sequence号
	 * @param playNo 比赛编码
	 * @return
	 */
	Integer getNewSequence(String playNo);
	
	public List<Process> query(String sql, Object[] params, int start, int end);
}
