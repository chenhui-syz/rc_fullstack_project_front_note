# 3-24 sequelize 表关联准备—理解 MySql 表外键在当当书城中的应用

```ts
CREATE TABLE `dangdang`.`firstctgy`  (
  `firstCtgyId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NULL,
  PRIMARY KEY (`firstCtgyId`));

insert into dangdang.firstctgy values(1,'童书'),(2,'电子书'),(3,'女装'),(4,'食品'),(5,'男装'),(6,'数码相机'),(7,'创意文具'),(8,'童装童鞋');


CREATE TABLE `dangdang`.`secondctgy`  (
  `secondctgyid` int NOT NULL AUTO_INCREMENT,
  `secctgyname` varchar(20) NOT NULL,
  `firstctgyId` int NOT NULL,
  PRIMARY KEY (`secondctgyid`));

  insert into dangdang.secondctgy values(1,'0-2岁',99);

CREATE TABLE `dangdang`.`secondctgy`  (
  `secondctgyid` int NOT NULL AUTO_INCREMENT,
  `secctgyname` varchar(20) NOT NULL,
  `firstctgyId` int NOT NULL,
  PRIMARY KEY (`secondctgyid`),
  CONSTRAINT `fk_firstctgyid` FOREIGN KEY (`firstctgyId`) REFERENCES `dangdang`.`firstctgy` (`firstCtgyId`) ON UPDATE CASCADE);

insert into dangdang.secondctgy values(1,'0-2岁',1);
insert into dangdang.secondctgy values(2,'3-6岁',1);
insert into dangdang.secondctgy values(3,'7-10岁',1);
insert into dangdang.secondctgy values(4,'11-14岁',1);
insert into dangdang.secondctgy values(5,'文艺',2);
insert into dangdang.secondctgy values(6,'人文社科',2);
insert into dangdang.secondctgy values(7,'教育',2);
```

