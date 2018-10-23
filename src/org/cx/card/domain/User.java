package org.cx.card.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.cx.card.command.CommandBuffer;
import org.cx.game.core.AbstractHost;
import org.cx.game.core.AbstractPlayer;

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
	
	@Transient
	private AbstractPlayer player = null;

	public AbstractPlayer getPlayer() {
		return player;
	}
	
	@Transient
	private AbstractHost host = null;

	public AbstractHost getHost() {
		return host;
	}
	public void setHost(AbstractHost host) {
		this.host = host;
		this.player = host.queryPlayerForName(account);
	}
	
	@Transient
	private CommandBuffer buffer = null;
	
	public CommandBuffer getBuffer() {
		if(null==buffer)
			buffer = new CommandBuffer(this);
		
		return buffer;
	}
}
