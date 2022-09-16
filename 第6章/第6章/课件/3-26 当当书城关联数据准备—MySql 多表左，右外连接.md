# 3-25 当当书城关联数据准备—MySql 多表左外连接

```ts
insert into thirdctgy(thirdname) values('图书100')

select tc.thirdctgyid,tc.thirdname,tc.secctgyid,sc.secctgyname from thirdctgy tc left outer join secondctgy sc on tc.secctgyid=sc.secondctgyid;
// 这个查询只查询出来我们想要的四个字段
// left outer join会把写在其左边的表的所有数据全部考虑，不管其外键是否为空
// 如果用内连接inner join就无法查询出来外键为null的数据出来
```



























