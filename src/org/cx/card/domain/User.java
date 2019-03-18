package org.cx.card.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.cx.game.core.AbstractHost;
import org.cx.game.core.Player;

@Entity
@Table(name="CUser")
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.TABLE)
	@Column(name="id")
	private Long cid;
	
	@Column(unique=true)
	private String account;
	private String name;
	private String password;
	
	public Long getCid() {
		return cid;
	}
	public void setCid(Long id) {
		this.cid = id;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	/*@Transient
	private String playNo = null;

	public String getPlayNo() {
		return playNo;
	}
	
	public void setPlayNo(String playNo) {
		this.playNo = playNo;
	}
	
	@Transient
	private Integer troop = null;
	
	public Integer getTroop() {
		return troop;
	}
	
	public void setTroop(Integer troop) {
		this.troop = troop;
	}*/
}
