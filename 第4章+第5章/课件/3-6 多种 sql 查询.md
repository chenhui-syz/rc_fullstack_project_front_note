# 3-6 多种 sql 查询

**1. 查询所有行数据：**

```ts
SELECT * FROM 表名;
```

**2. 投影查询：**

使用命令行进行数据库查询操作就可以视为一种投影式的查询

~~~
select userid,username,address from userinfo
~~~

**3. 别名设置**：

给某个字段名换个别称

~~~
select userid,username as 用户名,address as 地址 from userinfo
~~~

这种变化只是临时的，临时的投影显示而已，下次查询依然是数据库里的原名

**4.limit 查询：**

LIMIT 是 MySQL 中的一个特殊关键字，用于指定查询结果从哪条记录开始显示，一共显示多少条记录。

**三种使用方式：**

第一种方式： limit 起始位置,记录数。(位置的索引是从0开始的)

~~~
select userid,username as 用户名,address from userinfo limit 2,4;
~~~

第二种方式： limit 记录数 （ 从第一条记录开始查询 ）。

~~~
select userid,username as 用户名,address from userinfo limit 3;
~~~

第三种方式：limit  记录数 offset 起始位置。

~~~
select userid,username as 用户名,address from userinfo limit 4 offset 2;
~~~

方式1和方式3查询结果相同。

**5.条件查询**：

~~~
登录查询：username是wangping，密码是123的
select * from userinfo where username='wangping' and psw='123'
~~~

and 查询， or 查询  between 查询  in 查询  is null查询 模糊查询

~~~
给userinfo表所有的记录添加一个年龄age字段
alter table userinfo add age tinyint default 30;
更新字段(把userid为1的用户年龄更新为56)
update userinfo set age=56 where userid=1;
查询20岁-40岁之间的用户数据
select * from userinfo where age between 20 and 40;
查询年龄为18岁和35岁的用户数据
select * from userinfo where age in(18,35);
查询没有生日的用户数据birth
select * from userinfo where birth is null;
~~~

**模糊查询：**

% 代表0个或者多个字符

```ts
查询所有用户名以王开头的数据：
select * from userinfo where username like '王%';
查询用户名里包含小子的数据：
select * from userinfo where username like '%小%';

// 查询username包含小且前面有两个字符的用户数据。
select * from userinfo where username like '___小%';

// 区分大小写，查询username以大写L开头的数据：
select * from userinfo where username like binary 'L%'
// 为演示区分大小写准备的表和表数据。
create table test(id int,myname varchar(20))
insert into test(myname) values('wangwu');
insert into test values(1,'lisi');
insert into test values(2,'Lisi');

select * from userinfo usf where usf.userid=1
上面这个userinfo usf的意思就是给userinfo表临时起个别名usf，这样后面使用usf的时候通过.也可以自动出现提示（Navicat操作的时候）
```

**模糊查询注意细节：**

通配符尾部容易留空格，尾部空格导致通配符匹配失败。例如，“L% ”就不能匹配到“Lisi”。

尽管通配符可以匹配任意字符，但不能匹配 值 为 null 的记录。
