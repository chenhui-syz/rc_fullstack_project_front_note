# 3-46 装饰器重构 Koa 路由—Contoller 类装饰器实现

**代码实现：**

```ts
import loadRouters from '../common/ctrldecorators'
import MethodType from './methodtype'

type MyClassDecorator = <T extends { new (...args: any): any }>(targetClass: T) => any
export function Controller(rootPath: string): MyClassDecorator {
  function getFullPath(rootPath: string, routerPath: string) {
    if (rootPath) {
      if (rootPath.length >= 1) {
        if (!rootPath.startsWith('/')) {
          // 如果根路径没有以 / 开头
          rootPath = `/${rootPath}` // 增加 /
        } else if (rootPath === '/') {
          // 如果根路径等于 /
          rootPath = '' // 置空,防止和方法请求路径上的 / 重复用
        }
      }
    }
    return `${rootPath}${routerPath}`
  }
  return function (targetClass): any {
    for (let methodname in targetClass.prototype) {
      Object.keys(targetClass.prototype).forEach(() => {
        let routerPath = Reflect.getMetadata('path', targetClass.prototype, methodname)
        let methodType: MethodType = Reflect.getMetadata('methodType', targetClass.prototype, methodname)

        const targetMethodfunc = targetClass.prototype[methodname]
        if (routerPath && methodType) {
          let fullPath = getFullPath(rootPath, routerPath)
          const router = loadRouters.app.context.rootRouter
          
          router[methodType](fullPath, targetMethodfunc)
          //}
        }
      })
    }
  }
}
```
