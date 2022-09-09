# 3-41 自动路由重构—重构控制器路由自动加载

**修改1：把 getRouterClasses 修改成 getCtrlClasses** 

```ts

  public getRouterClasses() {
    const files = this.getFiles(path.join(process.cwd(), '/src/router'))
    //console.log(files)
    return files
  }
```

```ts
  getCtrlClasses() {
    let files = this.getFiles(path.join(process.cwd(), '/src/controller'))
    return files
  }
```


**修改2：把  LoadRouter 修改成 loadCtrlRouters**

```ts
public LoadRouter() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang')
    rootRouter.use(body());
    rootRouter.use(json())
    this.app.context.success = success
    this.app.context.fail = fail
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
    this.app.use(globalException)
    this.app.use(rootRouter.routes())
    this.app.listen(3002)
    console.log('监听3002')
  }
}
```


```ts
  public async loadCtrlRouters() {
    const rootRouter = new Router()
    this.app.context.rootRouter = rootRouter
    rootRouter.prefix('/dang')
    rootRouter.use(json()) //格式化json数据
    rootRouter.use(body()) //支持post请求的数据

    // 下面两行代码,是把成功和失败的方法加入到上下文对象中
    //  以后再用时就不用导入了
    this.app.context.success = success
    this.app.context.fail = fail
    this.app.use(globalException) //全部异常处理
    this.app.use(rootRouter.routes())
    //LoadRouters.router = rootRouter
    //console.log(' LoadRouters.router :', LoadRouters.router)
    let files: string[] = await this.getCtrlClasses()
    //console.log('files:', files)
    for (let file of files) {
      const fileName: string = file.substring(file.lastIndexOf('\\') + 1, file.lastIndexOf('.'))
      const extension: string = file.substring(file.lastIndexOf('.'), file.length)
      if (extension === '.ts' && fileName.indexOf('Controller') !== -1) {
        require(file)
      }
    }

    this.app.listen(5003)

    console.log('server running on port 5003')
  }
}
```
