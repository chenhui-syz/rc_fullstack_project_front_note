import AllCtrlRouterLoader from '../common/AllCtrlRouterLoader'
import log4js from '../common/LogUtil'
type MethodType = 'get' | 'post' | 'put' | 'delete'
export function Controller(modulePath: string = '/') {
  function getFullPath(reqPath: string) {
    if (modulePath) {
      if (modulePath.length > 1) {
        if (!modulePath.startsWith('/')) {
          modulePath = `/${modulePath}`
        }
      } else if (modulePath === '/') {
        modulePath = ''
      }
    }
    return `${modulePath}${reqPath}`
  }
  return function (targetClass: { new (...args: any): any }) {
    // 1. 获取原型上的请求方法名
    Object.keys(targetClass.prototype).forEach((methodname) => {
      // 2. 根据方法名获取具体的方法体
      const routerHandlerFn = targetClass.prototype[methodname]
      // 3. 获取请求路径和请求类型,根路由对象
      const reqPath = Reflect.getMetadata('path', targetClass.prototype, methodname)
      const fullReqPath = getFullPath(reqPath)
      const reqMethodType: MethodType = Reflect.getMetadata(
        'methodType',
        targetClass.prototype,
        methodname
      )
      // 4. 实现路由请求
      const rootRouter = AllCtrlRouterLoader.app.context.rootRouter
      if (fullReqPath && reqMethodType) {
        rootRouter[reqMethodType](fullReqPath, routerHandlerFn)
      }
    })
  }
}
