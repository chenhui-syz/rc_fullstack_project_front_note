# 3-44 TS 装饰器重构 Koa 路由—请求方法装饰器实现

实现：get 和 post 请求方法的装饰器实现。

**步骤1：定义 MethodType 类型**

```ts
type MethodType = 'get' | 'post' | 'put' | 'delete'

export default MethodType
```

**步骤2：方法装饰器实现**

```ts
import 'reflect-metadata'
import MethodType from './methodtype'
type MyMethodDecoratorType = (targetClassPrototype: any, methodname: string, dataprops: PropertyDescriptor) => void

function requestDecorator(methodType: MethodType) {
  return function (reqPath: string): MyMethodDecoratorType {
    return function (targetClassPrototype, methodname, dataprops) {

      Reflect.defineMetadata('path', reqPath, targetClassPrototype, methodname)
      Reflect.defineMetadata('methodType', methodType, targetClassPrototype, methodname)
    }
  }
}

export const get = requestDecorator('get')
export const post = requestDecorator('post')
export const put = requestDecorator('put')
```

**步骤3：构建装饰器类，并应用方法装饰器**

```ts
class CtgyController {
  @get('/findFirstCtgys')
  async findFirstCtgy(ctx: Koa.Context) {
    const firstCtgy: FirstCtgy[] = await ctgyService.findFirstCtgy()
    ctx.body=success(firstCtgy)
  }
  
  @get('/findSecThrdCtgys/:firstctgyId')
  async findSecThirdCtgys(ctx: Koa.Context) {
    const { firstctgyId } = ctx.params
    const secThrdCtgyList = await ctgyService.findSecThirdCtgys(firstctgyId)
    ctx.body=success(secThrdCtgyList)
  }
```
