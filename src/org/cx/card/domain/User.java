package org.cx.card.domain;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
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

import org.cx.game.card.CardFactory;
import org.cx.game.card.ICard;
import org.cx.game.command.CommandBuffer;
import org.cx.game.core.Context;
import org.cx.game.core.IPlayer;
import org.cx.game.core.Player;
import org.cx.game.tools.PropertiesUtil;
import org.cx.game.widget.CardGroup;
import org.cx.game.widget.CardGroupDecorator;
import org.cx.game.widget.ICamp;
import org.cx.game.widget.ICardGroup;
import org.cx.game.widget.ICemetery;
import org.cx.game.widget.IGround;
import org.cx.game.widget.IUseCard;
import org.cx.game.widget.UseCard;
import org.cx.game.widget.UseCardDecorator;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

@Entity
@Table(name="CUser")
public class User extends Player{

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
	private List<ICard> decks = null;
	
	public List<ICard> getDecks(){
		if(null==decks){                  //只加载一次数据库
			decks = CardFactory.getInstances(getCards2());  //切换到数据库，使用getCards()
		}
		return decks;
	}
	
	private static String filePath = "/org/cx/card/domain/user.xml";   
	//private static String filePath = "F:/CX/项目/MyEclipse/workspace101/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/card/docs/user/user.xml";
	
	private List<Integer> getCards2(){
		List<Integer> list = new ArrayList<Integer>();
		SAXReader saxReader = new SAXReader();
		InputStream is=CardFactory.class.getResourceAsStream(filePath);
		try {
			
			Document document = saxReader.read(is);
			Element root = document.getRootElement();
			Element users = root.element("users");
			for(Iterator it = users.elementIterator("user");it.hasNext();){
				Element user = (Element) it.next();
				Element account = user.element("account");
				if(getAccount().equals(account.getText())){
					Element cards = user.element("cards");
					String ids = cards.getText();
					String [] iss = ids.split(",");
					for(int i=0;i<iss.length;i++)
						list.add(Integer.valueOf(iss[i]));
				}
					
			}
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
}
