package org.cx.card.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="CCard")
public class Card {
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE)
	private Long id;
	
	private Integer cid;
	private String name;
	private String classname;
	
	@ManyToMany(cascade = CascadeType.REFRESH, mappedBy = "cards", fetch = FetchType.LAZY)
	private Set<User> users;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getCid() {
		return cid;
	}
	public void setCid(Integer cid) {
		this.cid = cid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getClassname() {
		return classname;
	}
	public void setClassname(String classname) {
		this.classname = classname;
	}
	
}
