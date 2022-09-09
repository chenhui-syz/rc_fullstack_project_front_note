# 3-5 mysql 命令状态下数据库，数据表操作

**1. 数据库操作。**

**创建数据库**：

如果不存在test数据库就创建test数据库

character：指定数据库的字符集，指定字符集的目的是为了避免在数据库中存储的数据出现乱码的情况。

collate：指定字符集的默认校对规则，这个在Navicat操作新建数据库的时候也都是统一选择utf8mb4_general_ci。

```ts
create database  IF NOT EXISTS test CHARACTER SET utf8mb4  COLLATE utf8mb4_general_ci;
```

**查看数据库**：

show databases

**选择数据库**：

 use    数据库名。

**删除数据库**：

drop database if exists 数据库名。

**2. 数据表操作**

use test    使用这个指令进入到test数据库，进行下面的数据库操作，界面提示   Database changed

**创建数据表**：

```ts
create table userinfo(userid int NOT NUll AUTO_INCREMENT,
		 username  varchar(30) NOT NULL,
		 psw   int NOT NULL,
		 address  varchar(50)  default '没有填写地址',
		 valid     TINYINT  default 1, 
		birth DATETIME null,
		 PRIMARY KEY (userid));
```

default 设置默认值

null  允许为空

userid设为主键（主键是可以唯一表示一条记录的字段）

插入后  show tables; 查看当前数据库里的表

select * from userinfo;    查询userinfo表里的所有字段

**修改表名：**

```ts
ALTER TABLE userinfo RENAME TO myuserinfo;
```

**修改表字段：**

```ts
ALTER TABLE <表名> CHANGE <旧字段名> <新字段名> <新数据类型>
alter table userinfo change password psw varchar(20)
```

<新数据类型>即便是和原来的相同，也是必须要写上的

**删除字段：**

```ts
ALTER TABLE <表名> DROP <字段名>
```

**删除数据表：**

```ts
DROP TABLE  IF EXISTS <表名>
```

**添加记录：**

```ts
insert into userinfo(username,psw) values('admin','123')
insert into userinfo(username,psw) values('kevin','123')
insert into userinfo(username,psw) values('lisi','123')
insert into userinfo values('lisi','123',xxx,xxx,...)  //如果这样写，就一定要按照字段的顺序全部写上才行
```

添加记录得时候not null 是必须要指定添加的，有默认值的或者null的，可以不给值，AUTO_INCREMENT也是可以不用给的

小知识：SQL 的关键字和函数名不区分大小写。

```ts
Select username from userinfo
select  username FROM  userinfo
上面两句话的作用是一样的
```
