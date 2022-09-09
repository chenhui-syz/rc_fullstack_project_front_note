# 3-39 装饰器重构 Koa 路由准备—reflect-metadata 和 理解为什么要用它

**1. 元数据定义、作用**

**2. 对象和对象属性上使用元数据**

**3. 直接在类，方法上定义元数据**

**4. 直接在类属性上定义元数据**

**1. 元数据定义、作用**

**1.1 什么是元数据**

元数据指附加在对象、类、方法、属性丶参数上的数据。

**1.2 元数据作用**

元数据用来帮助提供实现某种业务功能需要用到的数据。

**2.  对象和对象属性上使用元数据**

步骤1：安装 reflect-metadata 第三方库包

```ts
 cnpm i reflect-metadata -S
```

步骤2：代码实现

```ts
import 'reflect-metadata'
// 1. 对象
let obj = {
  username: "罗斯福",
  age: 23,
  info() {
    console.log("信息");
  }
}

Reflect.defineMetadata("metaobjkey", "我是一个对象的元数据", obj)
console.log(Reflect.getMetadata("metaobjkey", obj));// 是一个对象的元数据

//  在对象属性上定义和获取元数据
Reflect.defineMetadata('usernamemetakey', '用户名合法', obj, "username");
console.log(Reflect.getMetadata('usernamemetakey', obj, "username"));// 输出用户名合法

//  3.2 使用 Reflect.hasMetadata 查看对象或对象属性上是否存在某个元数据
if (Reflect.hasMetadata('describe', obj)) {
  console.log("obj存在describe元数据");
} else {
  console.log("obj不存在describe元数据");
}

if (Reflect.hasMetadata('metaobjkey', obj)) {
  console.log("obj存在metaobjkey元数据");
} else {
  console.log("obj不存在metaobjkey元数据");
}
```

**3  直接在类，方法上定义元数据**

 步骤1: 在类上定义元数据

```ts
import 'reflect-metadata'
@Reflect.metadata('decribe', '都是地球人')
class People {
  @Reflect.metadata("descible", "姓名不能包含非法汉字")
  username = "wangwu"
    
    
  @Reflect.metadata("importinfo", "去吃陶然居好吗")
  eat() {
  }
}

```

步骤2：获取类或方法上的元数据

```ts
//  1. 获取类上的元数据
console.log(Reflect.getMetadata('decribe', People));// 都是地球人

//  2. 获取方法上的元数据 第二个参数是原型
console.log(Reflect.getMetadata('importinfo', People.prototype, 'eat'));//去吃陶然居好吗

//  3. 判断People.prototype 原型上 eat 方法上是否存在importinfo元数据
if (Reflect.hasMetadata('importinfo', People.prototype, 'eat')) {
  console.log("hasMetadata=>People原型上存在eat方法的importinfo元数据");
}
```
