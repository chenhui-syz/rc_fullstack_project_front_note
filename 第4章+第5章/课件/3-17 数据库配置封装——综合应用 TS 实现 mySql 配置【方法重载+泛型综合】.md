# 3-17 数据库配置封装—灵活应用 TS 实现 mySql 配置【泛型综合+重载】

**1. 配置接口实现。**

```ts
  host: string // 可选属性
  user: string
  password: string
  port: number
  database: string
```

**2. 环境配置实现 【包括开发环境和生成环境】**

包括 dev 和 prod。


**3. 环境配置类实现。**

第一步：准备— package.json 设置环境变量。（prod和dev后面注意一定不要有空格）

```js
 "dev": "set NODE_ENV=dev&& nodemon --watch src/ -e ts --exec ts-node ./src/app.ts",
 "prod": "set NODE_ENV=prod&& nodemon --watch src/ -e ts --exec ts-node ./src/app.ts"
```

第二步：初始化配置，写入 init 方法。

```ts
    this.envConf = {
      dev: {
        host: 'localhost',
        user: 'admin',
        password: '123',
        database: 'dangdang',
        port: 3306,
      },
      prod: {
        host: 'www.newdomain.com',
        user: 'root',
        password: '123',
        database: 'dangdang',
        port: 3306,
      },
    }
```

**第三步：获取环境配置信息。**

实现要求：1. 获取整个环境配置。   2. 获取单个环境配置。

**第四步：重置配置 reset** 。
