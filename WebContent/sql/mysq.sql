
select * from ccard
select * from user_card
select * from cuser

insert cuser (id,account,name,password) values (1,'admin','上帝','123');
insert cuser (id,account,name,password) values (2,'chenxian','陈贤','123');
insert cuser (id,account,name,password) values (3,'wangzhi','王智','123');
insert cuser (id,account,name,password) values (4,'yaoxi','姚茜','123');


--查看mysql字符集
show variables like '%char%';        

set character_set_database=utf8;

select * from cprocess 
where playNo='4f5b9260-b7c5-4121-ac40-9d973141caba' 
--and sequence>=3
order by sequence desc


delete from cprocess





