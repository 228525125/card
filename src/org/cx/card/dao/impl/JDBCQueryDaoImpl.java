package org.cx.card.dao.impl;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.cx.card.dao.JDBCQueryDao;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class JDBCQueryDaoImpl extends JdbcDaoSupport implements JDBCQueryDao {

	public List queryForList(String sql) {
		// TODO Auto-generated method stub
		return getJdbcTemplate().queryForList(sql);
	}

	public List queryForList(String sql, Object[] params) {
		// TODO Auto-generated method stub
		return getJdbcTemplate().queryForList(sql, params);
	}

	public Map queryForMap(String sql) {
		// TODO Auto-generated method stub
		return getJdbcTemplate().queryForMap(sql);
	}

	public Object queryForObject(String sql, Class type) {
		// TODO Auto-generated method stub		
		return getJdbcTemplate().queryForObject(sql, type);		
	}
	
	@Override
	public Object execute(String callName, CallableStatementCallback csc) {
		// TODO Auto-generated method stub
		//getJdbcTemplate().call(CallableStatementCreator, arg1)
		return getJdbcTemplate().execute(callName, csc);
	}
	
}
