function MyMethodDecorator(targetClassPrototype: any, methodname: string,methodDecri: PropertyDescriptor) {// 数据属性
  methodDecri.value();// 执行被装饰器修饰的方法【输出分配角色.....】
}

function firstDecorator(targetClass:any){
  const targetClassInstance=new targetClass();
  console.log("进入到第一个装饰器");
}


// 目标类
@firstDecorator
class RoleService {
  public roleName: string = "管理员"
  constructor() {
  }

  @MyMethodDecorator
  DistribRoles() {// 分配角色
    console.log("分配角色.....");
  }
}
export {}