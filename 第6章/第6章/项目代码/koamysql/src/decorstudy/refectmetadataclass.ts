import 'reflect-metadata'
@Reflect.metadata('decribe', '都是地球人')
class People {
  @Reflect.metadata('descible', '姓名不能包含非法汉字')
  username = 'wangwu'

  @Reflect.metadata('importinfo', '去吃陶然居好吗')
  eat() {}
}

console.log(Reflect.getMetadata('decribe',People))
console.log(Reflect.getMetadata('descible',People.prototype,'username'))
console.log(Reflect.getMetadata('importinfo',People.prototype,'eat'))
