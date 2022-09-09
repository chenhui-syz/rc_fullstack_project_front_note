function firstDecorator(targetClass:any){
  const targetClassInstance=new targetClass();
  console.log("进入到第一个装饰器");
}

@firstDecorator
class CustomerService {
  name: string = '下单'
  constructor() {
    console.log("装饰器执行后执行了构造函数...")
  }
  buy() {
    console.log(this.name + '购买')
  }
  placeOrder() {
    //下单
    console.log(this.name + '下单购买')
  }
}
