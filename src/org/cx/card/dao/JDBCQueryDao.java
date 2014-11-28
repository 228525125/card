package org.cx.card.dao;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.CallableStatementCallback;

public interface JDBCQueryDao {

	public List queryForList(String sql);
	
	public List queryForList(String sql, Object [] params);
	
	public Map queryForMap(String sql);
	
	public Object queryForObject(String sql, Class type);
	
	public Object execute(String callName, CallableStatementCallback csc);
	
}
