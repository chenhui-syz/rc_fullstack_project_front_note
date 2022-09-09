# 3-33 解决 sequelize 多表关联局限性准备—表关联原生查询

**1. 使用 sequelize 建立原生查询**

1.1 CtgyDao 层

```js
class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao()

  async findSecThirdCtgys(firstctgyId: number) {
    let sql: string = `select  * from dangdang.secondctgy  sc inner join dangdang.thirdctgy  tc on sc.secondctgyid=tc.secctgyid  where sc.firstctgyId=${firstctgyId}`
    return (await sequelize.query(sql)) as [SecondCtgy[], SecondCtgy[]]
  }
}
```

**1.2 显示的数据**

![image.png](assets/image-20220515145644-5ambcoq.png)
