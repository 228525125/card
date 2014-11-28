package org.cx.card.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.cx.card.dao.JDBCQueryDao;
import org.cx.card.service.JDBCQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.web.tools.IPageList;

@Transactional
@Service("jdbcService")
public class JDBCQueryServiceImpl implements JDBCQueryService {
	
	@Autowired
	private JDBCQueryDao jdbcDao;
	
	@Override
	public List query(String sql) {
		// TODO Auto-generated method stub
		return jdbcDao.queryForList(sql);
	}

}
