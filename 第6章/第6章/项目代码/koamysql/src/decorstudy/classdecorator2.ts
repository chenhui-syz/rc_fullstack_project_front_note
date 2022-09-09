function firstDecoratorWrapper(params: string) {
  return function firstDecorator(targetClass: any) {
    const targetClassInstance = new targetClass()
    console.log('进入到第一个装饰器,接受到了一个参数:', params)
  }
}

function SecondClassDecorator(targetClass: any) {
  let targetClassObj = new targetClass()
  targetClassObj.buy()
  console.log('targetClass.name:', targetClass.name)
}

@firstDecoratorWrapper('aa')
@SecondClassDecorator
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
