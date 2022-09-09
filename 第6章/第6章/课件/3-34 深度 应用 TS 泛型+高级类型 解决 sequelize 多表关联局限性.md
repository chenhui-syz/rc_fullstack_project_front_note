# 3-34 TS 深度应用解决复杂难题—构建符合前端的多表级联数据

##### 实现步骤：

**第一步：获取数组元素类型**

```js
type EleOfArr<T> = T extends Array<infer E> ? E : never
```

**第二步：获取指定 key 组成的数组**

```js
export function getSubItemsFrmArr<T extends object[],
    K extends keyof EleOfArr<T>>(t: T, ...keys: K[]): Pick<EleOfArr<T>, K>[]{

  return t.map((item) => {
    let obj = keys.reduce((pre, cur, index) => {
      return { ...pre, [keys[index]]: item[keys[index]] }// 编译错误
    }, {})
    return obj
  }, []) as Pick<EleOfArr<T>, K>[]
}
```

**第三步：解决第二步编译错误**

```ts
1. 增加类型
type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K]
}

2. 替换
export function getSubItemsFrmArr<T extends EleOfArrPick<T>[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(t: T, ...keys: K[]): Pick<EleOfArr<T>,K>{
  return t.map((item) => {
    let obj = keys.reduce((pre, cur, index) => {
      return { ...pre, [keys[index]]: item[keys[index]] }
    }, {})
    return obj
  }, []) as Pick<EleOfArr<T>, K>[]
}
```

**第四步：进入 CtgyService，增加 convert 方法**

```ts
function convert(secthridlist: SecondCtgy[]) {
  let secCtgyLst = getSubItemsFrmArr(secthridlist, 'secondctgyid', 'secctgyname')
}
```

**第五步：进入 CtgyService 调用 convert 方法**

```ts
  async findSecThirdCtgys(firstctgyId: number) {
    let datarslt = await firstCtgyDao.findSecThirdCtgys(firstctgyId)
    let result = convert(datarslt[0])
    return result
  }
```

**查看输出结果**

![image.png](assets/image-20220515175212-ivf03gm.png)

**第六步：解决第五步元素重复问题—数组对象元素去重**

**（1）：获取数组对象元素单个属性值组成的数组。**

```ts
export function getOneItemValuesFrmArr<T extends ItemType[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(t: T, k: K) {
  return t.map(({ [k]: v }: E) => {
    return v
  }, <E>{})
}
```

**（2）：对第一步数组去重**

```ts
function getNoReptValsItem(arr: any[]) {
  const data: any[] = []
  return arr.filter((item) => !data.includes(item) && data.push(item))
}
```

**（3）：对象去重**

```ts
 function getNoReptItem<T extends ItemType<T>[], K extends keyof EleOfArr<T> = keyof EleOfArr<T>>(arr: T, k: K): ItemType<T>[] {
  const data: ItemType<T>[] = []
  //1 获取对象中某个元素的值组成的数组
  let oneItemValues: any[] = getOneItemValuesFrmArr(arr, k)
  // 2 对oneItemValues数组去重
  let noReptOneItemValues = getNoReptValsItem(oneItemValues)
  // 3 对对象去重
  arr.filter((item) => {
      // 如果数组中元素是否包含在这个第2步中元素的值数组中
      if (noReptOneItemValues.includes(item[k])) {
        //  先删除这个元素
        noReptOneItemValues.splice(noReptOneItemValues.indexOf(item[k]), 1)
        // 然后添加到数据中
        return  data.push(item)
      }
    return false
  })
  return data
}
```

**(4) : 修改第四步的 convert 方法**

```ts
function convert(secthridlist: SecondCtgy[]) {
  let secCtgys = getSubItemsFrmArr(secthridlist, 'secondctgyid', 'secctgyname')
  let noReptSecCtgys = getNoReptItem(secCtgyLst, 'secondctgyid') //去重后的二级分类和二级分类名称数组
  console.log("去重后的二级分类集合:",noReptSecCtgys);
 }
```

##### 第七步：构建 combine 对象 

```ts
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export function combine<T extends Record<string, any>[]>(...unionObj: T): UnionToIntersection<T[number]>
export function combine<T extends Record<string, any>[]>(...unionObj: T) {
  //return unionObj.reduce((acc, obj) => ({ ...acc, ...obj }), {})
  return unionObj.reduce((acc, obj) => {
    return { ...acc, ...obj }
  }, {})
}
```

##### 第八步：合成最终对象。

```TS
import { secThrCtgys, ItemType, EleOfArr, getSubItemsFrmArr } from './one'
import { getNoReptItem } from './two'

function combineRelativeCtgy<T extends ItemType<T>[]>(arr: T, realtiveKey: string, realtiveValues: any) {
  return arr.map((item) => {
    return combine(item, { [realtiveKey]: realtiveValues })
  })
}

type SecThrCtgyList={
  secondctgyid: number;
  secctgyname: string;
  firstctgyId: number;
  thirdctgyid: number;
  thirdname: string;
  secctgyid: number;
}[]
export default function convert(secThrCtgys:SecThrCtgyList) {
  let secCtgyList = getSubItemsFrmArr(secThrCtgys, 'secondctgyid', 'secctgyname')
  let noReptSecCtgyList = getNoReptItem(secCtgyList, 'secondctgyid') //去重后的二级分类和二级分类名称数组
  let thrdCtgyList = getSubItemsFrmArr(secThrCtgys, 'thirdctgyid', 'thirdname', 'secctgyid')

  const relatvieSecThrCtgyLst = combineRelativeCtgy(noReptSecCtgyList, 'thirdctgys', [])
  const lastSecThrCtgyList: typeof relatvieSecThrCtgyLst = [] // 最终二级三级分类保存数组
  type LastSecThrCtgy = EleOfArr<typeof relatvieSecThrCtgyLst>
  noReptSecCtgyList.map((noReptSecCtgy) => {
    const lastThrdList: typeof thrdCtgyList = []
    thrdCtgyList.forEach((thrdCtgy) => {
      if (noReptSecCtgy.secondctgyid === thrdCtgy.secctgyid) {
        lastThrdList.push({
          thirdctgyid: thrdCtgy.thirdctgyid,
          thirdname: thrdCtgy.thirdname,
          secctgyid: thrdCtgy.secctgyid,
        })
      }
    })
    const lastSecThrCtgy: LastSecThrCtgy = combine(noReptSecCtgy, { thirdctgys: lastThrdList })
    lastSecThrCtgyList.push(lastSecThrCtgy)
  })
  return lastSecThrCtgyList
}

```



##### 第九步： 作业：挑战深度复杂难题：把第八步写成一个通用 convert 方法，其他关联类也可以直接使用。

