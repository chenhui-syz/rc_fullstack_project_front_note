# 3-25 当当书城关联数据准备—MySql 多表内连接

```ts
CREATE TABLE `dangdang`.`thirdctgy`  (
  `thirdctgyid` int NOT NULL AUTO_INCREMENT,
  `thirdname` varchar(20) NOT NULL,
  `secctgyid` int NULL,
  PRIMARY KEY (`thirdctgyid`),
  constraint fk_secctgyid foreign key(`secctgyid`)  references secondctgy(`secondctgyid`));
/*三级分类【二级分类为0-2岁】*/
insert into thirdctgy values(1,'图画故事',1),(2,'认知',1),(3,'益智游戏',1),(4,'纸板书',1),(5,'艺术课堂',1),(6,'入园准备',1);

/* 三级分类【二级分类为3-6岁】*/
insert into thirdctgy values(7,'绘本',2),(8,'科普百科',2),(9,'少儿英语',2),(10,'乐高学习',2),(11,'入学准备',2);

/* 三级分类【二级分类为7-10岁】*/
insert into thirdctgy(thirdname,secctgyid) values('文学',3),('科普百科',3),('卡通动漫',3),('童话',3),('少儿英语',3);

/* 三级分类【二级分类为11-14岁】*/
insert into thirdctgy(thirdname,secctgyid) values('励志',4),('地理',4),('政治',4),('趣味幽默',4),('少儿英语',4),('益智游戏',4),('艺术课堂',4),('游戏/手工',4),('绘画',4);

/* 三级分类【二级分类为文艺】*/
insert into thirdctgy(thirdname,secctgyid) values('小说',5),('哲理文学',5),('传记',5),('青春文学',5),('动漫/幽默',5),('艺术',5),('古籍',5),('法律',5),('经济',5);

/* 三级分类【二级分类为人文社科】*/
insert into thirdctgy(thirdname,secctgyid) values('宗教哲学',6),('历史',6),('传记',6),('教育',6),('社会科学',6),('艺术',6),('工具书',6),('教师用书',6),('考研',6),("公务员",6);

```

select   * from A 表,B表 where A表.主键id=B表.外键id

select   * from A 表 inner join B 表 on A表.主键id=B表.外键id

select   * from B 表 inner join A 表 on A表.主键id=B表.外键id

























