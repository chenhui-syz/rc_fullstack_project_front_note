export class Parent {
  age: number
  constructor(age: number) {
    this.age = age
  }
}

class Son extends Parent {
  phone!: string
  constructor(phone: string, age: number) {
    super(age)
    this.phone = phone
  }
}

const son=new Son("111",23);
console.log(son)