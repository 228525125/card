package org.cx.card.service;

import java.util.List;
import java.util.Map;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.web.tools.IPageList;

public interface JDBCQueryService {
	
	/**
	 * 公共查询
	 * @param sql
	 * @return list
	 */
	public List query(String sql);
}
