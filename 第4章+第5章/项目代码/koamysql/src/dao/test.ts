export class Test {
  static test2 = new Test()
  constructor() {
    console.log('创建测试类')
  }
  static test() {
    console.log('哈哈测试')
  }
  static test3(){
    console.log("订单");
  }
}

export default Test.test()
