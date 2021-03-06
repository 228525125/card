package org.cx.card.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="CProcess")
public class Process {
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE)
	private Long id;
	
	@Column(length = 2000)
	private String playNo;
	
	private Integer sequence;
	
	@Column(length = 8000)
	private String response;
	
	private Integer executor;
	
	private String action;
	
	public static final String Sign_Syn = "syn";
	
	public static final String Sign_Send = "send";
	
	private String sign = Sign_Send;         //用于前台判断syn和send
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPlayNo() {
		return playNo;
	}
	public void setPlayNo(String playNo) {
		this.playNo = playNo;
	}
	public Integer getSequence() {
		return sequence;
	}
	public void setSequence(Integer sequence) {
		this.sequence = sequence;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
	}
	public Integer getExecutor() {
		return executor;
	}
	public void setExecutor(Integer executor) {
		this.executor = executor;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getSign() {
		return sign;
	}
	public void setSign(String sign) {
		this.sign = sign;
	}
}
