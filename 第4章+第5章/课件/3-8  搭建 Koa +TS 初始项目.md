# 3-8  搭建 Koa +TS 初始项目

 不用第三方框架搭建，从头搭建一个清晰，逐步升级的 Koa+ TS 项目。

**1.安装依赖**

```ts
cnpm install koa -S
cnpm install @types/koa -S

//  支持 post 请求依赖 
cnpm install koa-body -S

//  支持 json 格式依赖
cnpm install koa-json -S
cnpm install @types/koa-json -S


// 路由器依赖
cnpm install koa-router -S 
cnpm install @types/koa-router -S

// token 依赖
cnpm install jsonwebtoken  -S
cnpm install @types/jsonwebtoken -S

cnpm install @types/lodash  -S

// 日志依赖
cnpm install log4js -S 

// 支持访问 mysql 数据库依赖
cnpm install mysql -S 
cnpm install @types/mysql -S

// 装饰器元数据
cnpm install reflect-metadata  -S 

// ORM 映射工具依赖
cnpm install sequelize -S
cnpm install sequelize-typescript -S

// 自动检测文件变化后自动重启依赖。
cnpm install nodemon -S

// typescript + ts-node 依赖
cnpm install   typescript -S
cnpm install   ts-node -S

```

2. 配置启动脚本【热部署】

```ts
  "scripts": {
    "dev": "nodemon --watch src/ -e ts --exec ts-node ./src/app.ts"
  },
```

3. src文件夹下的常规 app.ts 文件编码【先用常规写法，后面会逐步升级】

```ts
import Koa from 'koa'
import body from 'koa-body'
import json from 'koa-json'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()
router.prefix('/dang') //为所有的路由访问添加路由前缀/dang，来作为一级路由

router.get('/test', async (ctx: Koa.Context) => {
  ctx.body = '第一个测试页面'
})
router.use(json())
router.use(body())

//  加载路由到全局路由上
app.use(router.routes())
app.listen(3002)
console.log('server running on port 3002')
```

4. 拷贝front的tsconfig.json配置文件并修改一下"module"改为 "commonjs"
5. 启动访问：http://localhost:3002/dang/test。
