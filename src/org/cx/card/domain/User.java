package org.cx.card.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.cx.game.core.IPlayer;

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
	
	@ManyToMany(cascade = CascadeType.REFRESH,fetch = FetchType.EAGER)  
    @JoinTable(name = "user_card", inverseJoinColumns = @JoinColumn(name = "card_id"), joinColumns = @JoinColumn(name = "user_id"))
	private Set<Card> cards;
	
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
	public Set<Card> getCards() {
		return cards;
	}
	public void setCards(Set<Card> cards) {
		this.cards = cards;
	}
	
	@Transient
	private IPlayer player = null;

	public IPlayer getPlayer() {
		return player;
	}
	public void setPlayer(IPlayer player) {
		this.player = player;
	}
	
}
