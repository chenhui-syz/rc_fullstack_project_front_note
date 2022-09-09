# 3-12 自动路由加载——手写路由自动加载【避开 TS 中 requireDirectory 底层坑】

**背景：requireDirectory 是 路由自动加载工具，但对 TS 支持并不友好，因此我们手写自动路由加载工具。**

```ts
import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import body from 'koa-body'
import json from 'koa-json'
class LoadRouter {
  app!: Koa
  static loadRouters: LoadRouter = new LoadRouter()
  public init(app: Koa) {
    this.app = app
    this.LoadRouter()
  }

  public getFiles(dir: string): string[] {
    let filePaths: string[] = []
    const fileNames = fs.readdirSync(dir)
    if (fileNames && fileNames.length > 0) {
      for (const fileName of fileNames) {
        const name = dir + '\\' + fileName
        filePaths.push(name)
      }
    }
    return filePaths
  }

  public getRouterClasses() {
   return this.getFiles(path.join(process.cwd(), '/src/router'))
  }

  public isRouter(obj: any): obj is Router {
    return obj instanceof Router
  }
  public LoadRouter() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang')
    rootRouter.use(json())
    let files: string[] = this.getRouterClasses()
    for (let file of files) {
      const extension: string = file.substring(file.lastIndexOf('.'), file.length)
      if (extension === '.ts') {
        const module = require(file)
        if (this.isRouter(module)) {
          rootRouter.use(module.routes()).use(module.allowedMethods())
        }
      }
    }
    this.app.use(rootRouter.routes())
    this.app.listen(3002)
    console.log('监听3002')
  }
}

export default LoadRouter.loadRouters

```
