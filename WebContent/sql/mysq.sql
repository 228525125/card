
select * from ccard
select * from user_card
select * from cuser

insert ccard (id,cid,name,classname) values (1,1001,'AxemanI','org.cx.game.card.life.AxemanI');
insert ccard (id,cid,name,classname) values (2,1007,'BowmanI','org.cx.game.card.life.BowmanI');
insert ccard (id,cid,name,classname) values (3,1004,'CracksmanI','org.cx.game.card.life.CracksmanI');
insert ccard (id,cid,name,classname) values (4,1008,'FirelockI','org.cx.game.card.life.FirelockI');
insert ccard (id,cid,name,classname) values (5,1,'HellLaird','org.cx.game.card.life.HellLaird');
insert ccard (id,cid,name,classname) values (6,1003,'MacemanI','org.cx.game.card.life.MacemanI');
insert ccard (id,cid,name,classname) values (7,1009,'MagictraineeI','org.cx.game.card.life.MagictraineeI');
insert ccard (id,cid,name,classname) values (8,1006,'ShieldguardI','org.cx.game.card.life.ShieldguardI');
insert ccard (id,cid,name,classname) values (9,1010,'SingleHandAxemanI','org.cx.game.card.life.SingleHandAxemanI');
insert ccard (id,cid,name,classname) values (10,1012,'SingleHandSwordmanI','org.cx.game.card.life.SingleHandSwordmanI');
insert ccard (id,cid,name,classname) values (11,1011,'SingleHandMacemanI','org.cx.game.card.life.SingleHandMacemanI');
insert ccard (id,cid,name,classname) values (12,1005,'SpearmanI','org.cx.game.card.life.SpearmanI');
insert ccard (id,cid,name,classname) values (13,1002,'SwordmanI','org.cx.game.card.life.SwordmanI');

insert cuser (id,account,name,password) values (1,'admin','上帝','123');
insert cuser (id,account,name,password) values (2,'chenxian','陈贤','123');
insert cuser (id,account,name,password) values (3,'wangzhi','王智','123');
insert cuser (id,account,name,password) values (4,'yaoxi','姚茜','123');



insert user_card (user_id,card_id) values (1,1);
insert user_card (user_id,card_id) values (1,2);
insert user_card (user_id,card_id) values (1,3);
insert user_card (user_id,card_id) values (1,4);
insert user_card (user_id,card_id) values (1,5);
insert user_card (user_id,card_id) values (1,6);
insert user_card (user_id,card_id) values (1,7);
insert user_card (user_id,card_id) values (1,8);
insert user_card (user_id,card_id) values (1,9);
insert user_card (user_id,card_id) values (1,10);
insert user_card (user_id,card_id) values (1,11);
insert user_card (user_id,card_id) values (1,12);
insert user_card (user_id,card_id) values (1,13);

insert user_card (user_id,card_id) values (2,1);
insert user_card (user_id,card_id) values (2,2);
insert user_card (user_id,card_id) values (2,3);
insert user_card (user_id,card_id) values (2,4);
insert user_card (user_id,card_id) values (2,5);
insert user_card (user_id,card_id) values (2,6);
insert user_card (user_id,card_id) values (2,7);
insert user_card (user_id,card_id) values (2,8);
insert user_card (user_id,card_id) values (2,9);
insert user_card (user_id,card_id) values (2,10);
insert user_card (user_id,card_id) values (2,11);
insert user_card (user_id,card_id) values (2,12);
insert user_card (user_id,card_id) values (2,13);

--查看mysql字符集
show variables like '%char%';        

set character_set_database=utf8;

select * from cprocess 
where playNo='4f5b9260-b7c5-4121-ac40-9d973141caba' 
--and sequence>=3
order by sequence desc


delete from cprocess


