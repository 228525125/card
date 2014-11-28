package org.cx.card.util;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class JsonUtil {

	public static String toJSONValue(String name,Object json){
		String result = "{\"result\":[{\""+name+"\":\""+json+"\"}]}";
		return result;
	}
	
	public static String toJSONArray(Object json){
		String result = "{\"result\":"+json+"}";
		return result;
	}
	
	public static String toJSONObject(Object json){
		String result = "{\"result\":["+json+"]}";
		return result;
	}
	
	public static String toJSONEmpty(){
		String result = "{\"result\":[{}]}";
		return result;
	}
}
