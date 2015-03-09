package org.cx.card.mvc;

import java.io.File;
import java.util.Iterator;
import java.util.Set;

import javax.servlet.ServletContext;

import org.apache.commons.fileupload.FileItem;
import com.easyjf.web.ActionContext;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.ExtResult;

public class UploadAction extends BaseAction {

	public final static String MAPXML = "map.xml";       //测试用图
	public final static String MAPDIR = "map";           //地图目录
	public final static String LIFEXML = "life.xml";
	public final static String LIFEDIR = "life";  
	public final static String ATTACKXML = "attack.xml";
	public final static String ATTACKDIR = "attack";
	public final static String USERXML = "user.xml";
	public final static String USERDIR = "user";

	public Page doIndex(WebForm form, Module m) {
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String fileSavePath = sc.getInitParameter("uploadPath");
		
		if(!form.getFileElement().keySet().isEmpty()){
			String selected = "";
			try {
				selected = saveFile(form, fileSavePath);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		Page page = pageForExtForm(form);
		page.setContentType("text/html;charset=UTF-8");
		return page;
	}
	
	/**
	 * 只保存文件
	 * @param form
	 * @param upLoadPath
	 * @return 返回保存的文件名
	 */
	public static String saveFile(WebForm form, String upLoadPath) throws Exception {
		String fileName = "";
		Set keys = form.getFileElement().keySet();
		for (Iterator it = keys.iterator(); it.hasNext();) {				
			String fieldName = (String) it.next();
			if(MAPDIR.equals(fieldName)){
				FileItem item = (FileItem) form.getFileElement().get(fieldName);
				if (item.getSize() == 0) {
					continue;
				}

				upLoadPath += MAPDIR +"/";
			    File file = new File(upLoadPath);
			    
			    if(!file.exists()){
					file.mkdirs();
				}
			    for(File f : file.listFiles()){   //删除旧的文件
			    	if(MAPXML.equals(f.getName())){
			    		f.delete();
			    	}
			    }
			    fileName = MAPXML;
			    	
			    file = new File(upLoadPath+fileName);
			    if(!file.exists()){
			    	file.createNewFile();
			    }
			    item.write(file);
			}else if(LIFEDIR.equals(fieldName)){
				FileItem item = (FileItem) form.getFileElement().get(fieldName);
				if (item.getSize() == 0) {
					continue;
				}

				upLoadPath += LIFEDIR + "/";
			    File file = new File(upLoadPath);
			    
			    if(!file.exists()){
					file.mkdirs();
				}
			    for(File f : file.listFiles()){   //删除旧的文件
			    	if(LIFEXML.equals(f.getName())){
			    		f.delete();
			    	}
			    }
			    fileName = LIFEXML;
			    
			    file = new File(upLoadPath+fileName);
			    if(!file.exists()){
			    	file.createNewFile();
			    }
			    item.write(file);
			}else if(ATTACKDIR.equals(fieldName)){
				FileItem item = (FileItem) form.getFileElement().get(fieldName);
				if (item.getSize() == 0) {
					continue;
				}

				upLoadPath += ATTACKDIR+"/";
			    File file = new File(upLoadPath);
			    
			    if(!file.exists()){
					file.mkdirs();
				}
			    for(File f : file.listFiles()){   //删除旧的文件
			    	if(ATTACKXML.equals(f.getName())){
			    		f.delete();
			    	}
			    }
			    fileName = ATTACKXML;
			    
			    file = new File(upLoadPath+fileName);
			    if(!file.exists()){
			    	file.createNewFile();
			    }
			    item.write(file);
			}else if(USERDIR.equals(fieldName)){
				FileItem item = (FileItem) form.getFileElement().get(fieldName);
				if (item.getSize() == 0) {
					continue;
				}

				upLoadPath += USERDIR+"/";
			    File file = new File(upLoadPath);
			    
			    if(!file.exists()){
					file.mkdirs();
				}
			    for(File f : file.listFiles()){   //删除旧的文件
			    	if(USERXML.equals(f.getName())){
			    		f.delete();			    		
			    	}
			    }
			    fileName = USERXML;
			    
			    file = new File(upLoadPath+fileName);
			    if(!file.exists()){
			    	file.createNewFile();
			    }
			    item.write(file);
			}else{
				fieldName = "";
			}
		}
		
		return fileName;
	}
}
