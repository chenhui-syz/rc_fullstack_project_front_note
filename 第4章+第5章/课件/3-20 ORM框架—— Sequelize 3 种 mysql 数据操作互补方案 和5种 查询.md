# 3-20 ORM框架— Sequelize 3 种 mysql 数据操作方案 和5种 查询

**1. 认识 ORM**

:*ORM*(Object Relation Mapping)对象关系映射

 ORM  就是为了避免直接编写 sql 语句带来的繁琐，而把关系型数据表数据直接映射为 js 对象进行查询，同时也能把 js 对象 转换为关系型数据表的数据进行增加，修改或删除。

x import Koa, { Context } from 'koa'const globalException = async (ctx: Context, next: Koa.Next) => {  const context = ctx.app.context  console.log('进入中间件异常')  try {    await next()  } catch (err: any) {    ctx.body = context.fail(`服务器错误${err.message}`)  }}​export default globalExceptionts

**Sequelize** 是一个基于 promise 的 Node.js ORM，目前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server。

**3. Sequelize 主要特点**

特点1：支持事务（保证数据安全的重要技能）

特点2：支持一对一，一对多，多对一，多对多 关联表的映射。

**4. 如何使用 sequelize 完成 CRUD **

##### 第一步：**Sequelize连接MySql**

```js
import { where, Op, ModelAttributes, DataTypes } from 'sequelize'
import { Sequelize, ModelStatic, Model } from 'sequelize-typescript'
//创建sequelize对象,参数分别为：数据库名称，数据库类型，密码，配置
let { host, user, password, database, port }: dbConConf = conf.getConf()
var mySequelize = new Sequelize(database, 'admin', '123', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql', //   表示是何种数据库
  define: { timestamps: false, freezeTableName: true },
})
export default mySequelize //导出创建的sequelize对象
```

##### 第二步：执行查询。

##### 第二步有3个方案。

##### 方案1： 使用 sequelize 的 define 方法 定义一个模型来实现。

适合对单表进行的各种查询。

适合单表添加，更新。

适合多表级联添加，更新。

不适合多表级联查询，和前端取出数据相差甚远。

```js
var UserModel = mySequelize.define(
  'userinfo',
  {
    userid: {
      type: DataTypes.INTEGER, //表示属性的数据类型
      field: 'userid', //属性对应的列名,若不定义field则表中的列名(userid)就是属性名
      primaryKey: true, //表示主键
      autoIncrement: true, //表示主键自增
    },
    username: {
      type: DataTypes.STRING(30),
      field: 'username',
      allowNull: false, //表示当前列是否允许为空，false表示该列不能为空
      //unique:true    //表示该列的值必须唯一
    },
    password: {
      type: DataTypes.STRING(20),
      field: 'password',
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
      field: 'address',
      allowNull: true,
    },
    valid: {
      type: DataTypes.TINYINT,
      field: 'valid',
      allowNull: true,
    },
  },
  {
    freezeTableName: true, //true表示使用给定的表名，false表示模型名后加s作为表名
    timestamps: false, //true表示给模型加上时间戳属性(createAt、updateAt),false表示不带时间戳属性
  }
)
```

同步数据表

```js
//同步数据库，force的值为false，表若存在则先删除后创建，force的值为true表示表若存在则不创建
UserModel.sync({ force: true })
```

##### 使用方案1 define 的模型来实现添加用户。

```js
async function addUser() {
  const dbUserinfo = (await UserModel.create({
    username: 'kate',
    password: '123',
    address: '四平路',
  })) as Userinfo
  console.log(dbUserinfo.dataValues)
}
```

##### 使用方案1完成查询所有用户操作。

```js
async function findAll() {
  let result = await UserModel.findAll({
    raw: true,
  })
```

##### 方案2：使用 sequelize 的原生操作。

##### 适合场景：适合增删改查所有场景。

```js
  async findSecThirdCtgys(firstctgyId: number) {
    let sql: string = `select  * from dangdang.secondctgy  sc inner join dangdang.thirdctgy  tc on sc.secondctgyid=tc.secctgyid  where sc.firstctgyId=${firstctgyId}`
    return (await sequelize.query(sql)) as [SecondCtgy[], SecondCtgy[]]
  }
```

##### 方案3：使用模型类来实现。

##### 应用场景：适合对单表进行的各种查询。

```js
import { Column, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'userinfo',
})
export default class Userinfo extends Model<Userinfo> {
  @Column({
    field:'userid',
    primaryKey: true,
    autoIncrement: true,
  })
  userid!: number
  @Column
  public username!: string
  @Column
  password!: string
  @Column
  address!: string
  @Column
  valid!: number

  token!: string
}
```

##### 使用方案3完成查询所有用户操作。

```js
async function findAll() {
  let result = await UserModel.findAll({
    raw: true,
  })
```

**5. 其他查询**

**1. 投影查询，2. or and 查询  3. 模糊查询 4. 聚合查询** **5. 分页查询**













