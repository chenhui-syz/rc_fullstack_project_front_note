# 3-22 连接池应用——koa 使用连接池访问 mysql 和感知连接池的存在

**1. 连接池配置**

```js
var mySequelize = new Sequelize(database, 'admin', '123', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql', //   表示是何种数据库
  define: { timestamps: false, freezeTableName: true },
  pool: {
    //数据库连接池
    max:300, //最大连接对象的个数
    // 最小连接数
    min: 50,    
    // idle 这个属性控制连接池中空闲连接的最大空闲时间，单位为毫秒，只有当连接池中连接数量大于最小连接数量时会生效。 
    idle: 10000, // 空闲连接最长等待时间，单位为毫秒
    acquire: 1000, // 表示一条 sql 查询在获取连接资源之前的最长等待时间，单位 秒
  }
})
```

**2. 底层默认连接池**

默认连接池配置。

```js
class ConnectionManager {
  constructor(dialect, sequelize) {
    const config = _.cloneDeep(sequelize.config);
    this.sequelize = sequelize;
    this.config = config;
    this.dialect = dialect;
    this.versionPromise = null;
    this.dialectName = this.sequelize.options.dialect;
    if (config.pool === false) {
      throw new Error("Support for pool:false was removed in v4.0");
    }
    config.pool = _.defaults(config.pool || {}, {
      max: 5,
      min: 0,
      idle: 1e4,
      acquire: 6e4,
      evict: 1e3,
      validate: this._validate.bind(this)
    });
```
