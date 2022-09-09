import 'reflect-metadata'
// 1. 对象
let obj = {
  username: '罗斯福',
  age: 23,
  info() {
    console.log('信息')
  },
}
Reflect.defineMetadata('descri', '我的姓名是有一段历史的', obj)
console.log(Reflect.getMetadata('descri', obj))

Reflect.defineMetadata('descri', '对象附加2', obj, 'username')
console.log(Reflect.getMetadata('descri', obj,'username'))
