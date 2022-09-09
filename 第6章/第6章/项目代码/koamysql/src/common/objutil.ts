import { EleOfArr, MyRecord, PickEnhance, RsltRecType } from '../alltypes'

export function getSingleItemFrmArr<T extends any[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(t: T, k: K) {
  return t.map(({ [k]: v }: E) => {
    //S100
    return v
  }, <E>{})
}

//type ReturnType<E, K1 extends keyof E, K2 extends keyof E> = { K1: E[K1]; K2: E[K2] }[]
// convertSubTodoItemList返回结果类型

// convertSubTodoItemList返回类型为：{ [x: string]: E[K1] | E[K2]; }[]
// 返回的是元素为Record类型【{ [x: string]: E[K1] | E[K2]; }】的数组
// 但因为[key1]和[key2]的值可以表示任意字符串或整数或symbol类型的数据
//  所以就用 [x: string]来表示了,而值就是 E[K1] | E[K2]中的一个了
export function convertSubTodoItemList0<
  T extends Record<string, any>[],
  K1 extends keyof EleOfArr<T>,
  K2 extends keyof EleOfArr<T>,
  E = EleOfArr<T>
>(t: T, key1: K1, key2: K2): MyRecord<EleOfArr<T>, K1, K2> {
  // reduce 第二个参数是 Todo 类型，所以可以解构成{ title, completed }
  //
  return t.map(({ [key1]: v1, [key2]: v2 }) => {
    //S100
    return { [key1]: v1, [key2]: v2 }
  })
}

//export function getSubItemList<T extends RsltRecType<T>[], K extends keyof EleOfArr<T>,
export function getSubItemList<T extends RsltRecType<T>[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(
  t: T,
  ...keys: K[]
): Pick<EleOfArr<T>, K>[] {
  // reduce 第二个参数是 Todo 类型，所以可以解构成{ title, completed }
  return t.map((item) => {
    //S100
    let obj = keys.reduce((pre, cur, index) => {
      //if (hasOwn(item, key)) return { [key]: item[key] }
      return { ...pre, [keys[index]]: item[keys[index]] }
    }, {})
    //console.log('obj', obj)
    return obj
  }, []) as Pick<EleOfArr<T>, K>[]
}

// let arr = [{age:23}, {address:"beijing"}]
// let obj = { ...arr }
// 对象去重
function uniqueArrEle(arr: any[]) {
  const data1: any[] = []
  return arr.filter((item) => !data1.includes(item) && data1.push(item))
}

export function uniqueObj<T extends RsltRecType<T>[], K extends keyof EleOfArr<T> = keyof EleOfArr<T>>(
  arr: T,
  k: K
): RsltRecType<T>[] {
  const data: RsltRecType<T>[] = []
  //1 获取对象中某个元素的值组成的数组
  let objValAttr: any[] = getSingleItemFrmArr(arr, k)
  //console.log('objValAttr:', objValAttr)
  // 2 对1的数组去重
  let uniqObjValAttr = uniqueArrEle(objValAttr)
  //console.log('objValAttrUniq:', objValAttrUniq)
  // 3 对对象去重
  arr.filter((item) => {
    // 如果数组中元素是否包含在这个第2步中元素的值数组中
    //if (hasOwn(item, k)) {
    if (uniqObjValAttr.includes(item[k])) {
      //  先删除这个元素
      uniqObjValAttr.splice(uniqObjValAttr.indexOf(item[k]), 1)
      // 然后添加到数据中
      data.push(item);
    }
    return false
  })
  return data
}

let secondlist = [
  {
    secondctgyid: 1,
    secctgyname: '0-2岁',
  },
  {
    secondctgyid: 1,
    secctgyname: '0-2岁',
  },
  {
    secondctgyid: 1,
    secctgyname: '0-2岁',
  },
  {
    secondctgyid: 2,
    secctgyname: '3-6岁',
  },
  {
    secondctgyid: 2,
    secctgyname: '3-6岁',
  },
  {
    secondctgyid: 2,
    secctgyname: '3-6岁',
  },
  {
    secondctgyid: 3,
    secctgyname: '7-10岁',
  },
  {
    secondctgyid: 3,
    secctgyname: '7-10岁',
  },
]

const result = uniqueObj(secondlist, 'secondctgyid')
console.log(result)
// let secthridlist = [
//   {
//     secondctgyid: 1,
//     secctgyname: '0-2岁',
//     firstctgyid: 1,
//     thirdctgyid: 1,
//     thirdctgyname: '图画故事',
//     secctgyid: 1,
//   },
//   {
//     secondctgyid: 1,
//     secctgyname: '0-2岁',
//     firstctgyid: 1,
//     thirdctgyid: 2,
//     thirdctgyname: '认知',
//     secctgyid: 1,
//   },
//   {
//     secondctgyid: 1,
//     secctgyname: '0-2岁',
//     firstctgyid: 1,
//     thirdctgyid: 3,
//     thirdctgyname: '图画故事',
//     secctgyid: 1,
//   },
//   {
//     secondctgyid: 1,
//     secctgyname: '0-2岁',
//     firstctgyid: 1,
//     thirdctgyid: 4,
//     thirdctgyname: '图画故事',
//     secctgyid: 1,
//   },
//   {
//     secondctgyid: 1,
//     secctgyname: '0-2岁',
//     firstctgyid: 1,
//     thirdctgyid: 5,
//     thirdctgyname: '图画故事',
//     secctgyid: 1,
//   },
//   {
//     secondctgyid: 1,
//     secctgyname: '0-2岁',
//     firstctgyid: 1,
//     thirdctgyid: 6,
//     thirdctgyname: '图画故事',
//     secctgyid: 1,
//   },
//   {
//     secondctgyid: 2,
//     secctgyname: '3-6岁',
//     firstctgyid: 1,
//     thirdctgyid: 7,
//     thirdctgyname: '绘本',
//     secctgyid: 2,
//   },
//   {
//     secondctgyid: 2,
//     secctgyname: '3-6岁',
//     firstctgyid: 1,
//     thirdctgyid: 8,
//     thirdctgyname: '科普百科',
//     secctgyid: 2,
//   },
//   {
//     secondctgyid: 2,
//     secctgyname: '3-6岁',
//     firstctgyid: 1,
//     thirdctgyid: 9,
//     thirdctgyname: '少儿英语',
//     secctgyid: 2,
//   },
//   {
//     secondctgyid: 2,
//     secctgyname: '3-6岁',
//     firstctgyid: 1,
//     thirdctgyid: 10,
//     thirdctgyname: '益智游戏',
//     secctgyid: 2,
//   },
//   {
//     secondctgyid: 2,
//     secctgyname: '3-6岁',
//     firstctgyid: 1,
//     thirdctgyid: 11,
//     thirdctgyname: '入学准备',
//     secctgyid: 2,
//   },
//   {
//     secondctgyid: 3,
//     secctgyname: '7-10岁',
//     firstctgyid: 1,
//     thirdctgyid: 12,
//     thirdctgyname: '文学',
//     secctgyid: 3,
//   },
//   {
//     secondctgyid: 3,
//     secctgyname: '7-10岁',
//     firstctgyid: 1,
//     thirdctgyid: 13,
//     thirdctgyname: '科普百科',
//     secctgyid: 3,
//   },
//   {
//     secondctgyid: 3,
//     secctgyname: '7-10岁',
//     firstctgyid: 1,
//     thirdctgyid: 14,
//     thirdctgyname: '卡通动漫',
//     secctgyid: 3,
//   },
//   {
//     secondctgyid: 3,
//     secctgyname: '7-10岁',
//     firstctgyid: 1,
//     thirdctgyid: 15,
//     thirdctgyname: '童话',
//     secctgyid: 3,
//   },
//   {
//     secondctgyid: 3,
//     secctgyname: '7-10岁',
//     firstctgyid: 1,
//     thirdctgyid: 16,
//     thirdctgyname: '少儿英语',
//     secctgyid: 3,
//   },
//   {
//     secondctgyid: 4,
//     secctgyname: '11-14岁',
//     firstctgyid: 1,
//     thirdctgyid: 17,
//     thirdctgyname: '励志',
//     secctgyid: 4,
//   },
//   {
//     secondctgyid: 4,
//     secctgyname: '11-14岁',
//     firstctgyid: 1,
//     thirdctgyid: 18,
//     thirdctgyname: '地理',
//     secctgyid: 4,
//   },
//   {
//     secondctgyid: 4,
//     secctgyname: '11-14岁',
//     firstctgyid: 1,
//     thirdctgyid: 19,
//     thirdctgyname: '政治',
//     secctgyid: 4,
//   },
//   {
//     secondctgyid: 4,
//     secctgyname: '11-14岁',
//     firstctgyid: 1,
//     thirdctgyid: 20,
//     thirdctgyname: '趣味幽默',
//     secctgyid: 4,
//   },
//   {
//     secondctgyid: 4,
//     secctgyname: '11-14岁',
//     firstctgyid: 1,
//     thirdctgyid: 21,
//     thirdctgyname: '少儿英语',
//     secctgyid: 4,
//   },
//   {
//     secondctgyid: 4,
//     secctgyname: '11-14岁',
//     firstctgyid: 1,
//     thirdctgyid: 22,
//     thirdctgyname: '益智游戏',
//     secctgyid: 4,
//   },
//   {
//     secondctgyid: 4,
//     secctgyname: '11-14岁',
//     firstctgyid: 1,
//     thirdctgyid: 23,
//     thirdctgyname: '艺术课堂',
//     secctgyid: 4,
//   },
//   {
//     secondctgyid: 4,
//     secctgyname: '11-14岁',
//     firstctgyid: 1,
//     thirdctgyid: 24,
//     thirdctgyname: '游戏/手工',
//     secctgyid: 4,
//   },
//   {
//     secondctgyid: 4,
//     secctgyname: '11-14岁',
//     firstctgyid: 1,
//     thirdctgyid: 25,
//     thirdctgyname: '绘画',
//     secctgyid: 4,
//   },
//   {
//     secondctgyid: 5,
//     secctgyname: '14-16岁',
//     firstctgyid: 1,
//     thirdctgyid: 26,
//     thirdctgyname: '小说',
//     secctgyid: 5,
//   },
//   {
//     secondctgyid: 5,
//     secctgyname: '14-16岁',
//     firstctgyid: 1,
//     thirdctgyid: 27,
//     thirdctgyname: '哲理文学',
//     secctgyid: 5,
//   },
//   {
//     secondctgyid: 5,
//     secctgyname: '14-16岁',
//     firstctgyid: 1,
//     thirdctgyid: 28,
//     thirdctgyname: '传记',
//     secctgyid: 5,
//   },
//   {
//     secondctgyid: 5,
//     secctgyname: '14-16岁',
//     firstctgyid: 1,
//     thirdctgyid: 29,
//     thirdctgyname: '青春文学',
//     secctgyid: 5,
//   },
//   {
//     secondctgyid: 5,
//     secctgyname: '14-16岁',
//     firstctgyid: 1,
//     thirdctgyid: 30,
//     thirdctgyname: '动漫/幽默',
//     secctgyid: 5,
//   },
//   {
//     secondctgyid: 5,
//     secctgyname: '14-16岁',
//     firstctgyid: 1,
//     thirdctgyid: 31,
//     thirdctgyname: '艺术',
//     secctgyid: 5,
//   },
//   {
//     secondctgyid: 5,
//     secctgyname: '14-16岁',
//     firstctgyid: 1,
//     thirdctgyid: 32,
//     thirdctgyname: '古籍',
//     secctgyid: 5,
//   },
//   {
//     secondctgyid: 5,
//     secctgyname: '14-16岁',
//     firstctgyid: 1,
//     thirdctgyid: 33,
//     thirdctgyname: '法律',
//     secctgyid: 5,
//   },
//   {
//     secondctgyid: 5,
//     secctgyname: '14-16岁',
//     firstctgyid: 1,
//     thirdctgyid: 34,
//     thirdctgyname: '经济',
//     secctgyid: 5,
//   },
//   {
//     secondctgyid: 6,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 35,
//     thirdctgyname: '宗教哲学',
//     secctgyid: 6,
//   },
//   {
//     secondctgyid: 6,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 36,
//     thirdctgyname: '历史',
//     secctgyid: 6,
//   },
//   {
//     secondctgyid: 6,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 37,
//     thirdctgyname: '传记',
//     secctgyid: 6,
//   },
//   {
//     secondctgyid: 6,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 38,
//     thirdctgyname: '教育',
//     secctgyid: 6,
//   },
//   {
//     secondctgyid: 6,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 39,
//     thirdctgyname: '社会科学',
//     secctgyid: 6,
//   },
//   {
//     secondctgyid: 6,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 40,
//     thirdctgyname: '艺术',
//     secctgyid: 6,
//   },
//   {
//     secondctgyid: 6,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 41,
//     thirdctgyname: '工具书',
//     secctgyid: 6,
//   },
//   {
//     secondctgyid: 6,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 42,
//     thirdctgyname: '教师用书',
//     secctgyid: 6,
//   },
//   {
//     secondctgyid: 6,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 43,
//     thirdctgyname: '考研',
//     secctgyid: 6,
//   },
//   {
//     secondctgyid: 6,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 44,
//     thirdctgyname: '公务员',
//     secctgyid: 6,
//   },
//   {
//     secondctgyid: 7,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 45,
//     thirdctgyname: '中小学教辅',
//     secctgyid: 7,
//   },
//   {
//     secondctgyid: 7,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 46,
//     thirdctgyname: '考试',
//     secctgyid: 7,
//   },
//   {
//     secondctgyid: 7,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 47,
//     thirdctgyname: '传记',
//     secctgyid: 7,
//   },
//   {
//     secondctgyid: 7,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 48,
//     thirdctgyname: '大中专教材',
//     secctgyid: 7,
//   },
//   {
//     secondctgyid: 7,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 49,
//     thirdctgyname: '外语',
//     secctgyid: 7,
//   },
//   {
//     secondctgyid: 7,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 50,
//     thirdctgyname: '艺术',
//     secctgyid: 7,
//   },
//   {
//     secondctgyid: 7,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 51,
//     thirdctgyname: '工具书',
//     secctgyid: 7,
//   },
//   {
//     secondctgyid: 7,
//     secctgyname: '16-17岁',
//     firstctgyid: 1,
//     thirdctgyid: 52,
//     thirdctgyname: '艺术',
//     secctgyid: 7,
//   },
// ]

// //let obj:{}[]=[]
// //let ob1=obj as  Record<string,any>[]
// let ss = [{ age: 23 }, { username: 'wangwu' }, { address: 'dd' }]
// type Sd<T extends any[]> = T[number]
// type Convert<T> = T extends any ? T : never
// type Rslt = Convert<Sd<typeof ss>>

// let secCtgyLst = convertSubTodoItemList(secthridlist, 'secondctgyid', 'secctgyname')
// //type dd=RsltRecType<typeof secCtgyLst>
// let sglItemSecCtgyLst = uniqueObj(secCtgyLst, 'secondctgyid')

// console.log('sglItemSecCtgyLst:', sglItemSecCtgyLst)
// let thrdCtgyLst = convertSubTodoItemList(secthridlist, 'thirdctgyid', 'thirdctgyname', 'secctgyid')
// console.log('thrdCtgyLst:', thrdCtgyLst)
// export type SubList<T extends Exclude<Record<string, any>, any[]>, K extends keyof T> = Pick<T, K>[]

// type SublistItem = Pick<SecondCtgy, 'secondctgyid' | 'secctgyname' | 'thirdCtgyList'>
// type SublistArr = SubList<SecondCtgy, 'secondctgyid' | 'secctgyname' | 'thirdCtgyList'>
// let subListArr: SublistArr = []
// sglItemSecCtgyLst.map((secCtgy) => {
//   let { secondctgyid, secctgyname } = secCtgy
//   let thirdCtgyList: Pick<EleOfArr<typeof thrdCtgyLst>, 'thirdctgyid' | 'thirdctgyname'>[] = []
//   thrdCtgyLst.forEach((thrdCtgy) => {
//     if (secCtgy.secondctgyid === thrdCtgy.secctgyid) {
//       thirdCtgyList.push({ thirdctgyid: thrdCtgy.thirdctgyid, thirdctgyname: thrdCtgy.thirdctgyname })
//     }
//   })
//   console.log('subThrdLst:', thirdCtgyList)
//   const secThrdLstCombine: SublistItem = combine({ secondctgyid, secctgyname }, { thirdCtgyList })
//   subListArr.push(secThrdLstCombine)
// })
// console.log('subListArr:', subListArr)
// thrdCtgyLst.forEthirdCtgyListach((item) => {
//   console.log(item.secctgyid)
// })

//let thirdCtgyList = convertSubTodoItemList(secthridlist, 'secctgyid', 'secctgyname')
