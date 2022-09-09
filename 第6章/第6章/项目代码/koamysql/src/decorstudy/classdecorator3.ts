function firstDecoratorWrapper(params: string) {
  return function firstDecorator(targetClass: {new (...args:any):any}) {
    const targetClassInstance = new targetClass()
    Object.keys(targetClass.prototype).forEach(methodname=>{
        console.log(methodname)
    })
  }
}

@firstDecoratorWrapper('aa')
class CustomerService {
  name: string = '下单'
  constructor() {
    console.log('装饰器执行后执行了构造函数...')
  }
  buy() {
    console.log(this.name + '购买')
  }
  placeOrder() {
    //下单
    console.log(this.name + '下单购买')
  }
}
export {}
