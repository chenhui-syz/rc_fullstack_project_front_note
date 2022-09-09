import { secThrCtgys, ItemType, EleOfArr, getSubItemsFrmArr } from './one'
import { getNoReptItem } from './two'

function combineRelativeCtgy<T extends ItemType<T>[]>(
  arr: T,
  realtiveKey: string,
  realtiveValues: any
) {
  return arr.map((item) => {
    return combine(item, { [realtiveKey]: realtiveValues })
  })
}

type SecThrCtgyList = {
  secondctgyid: number
  secctgyname: string
  firstctgyId: number
  thirdctgyid: number
  thirdname: string
  secctgyid: number
}[]
export default function convert(secThrCtgys: SecThrCtgyList) {
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

type T = [
  { secondctgyid: string; secctgyname: string },
  { secondctgyid: number; thirdctgyid: number; thirdname: string }
]
type TNumber = T[number]

type UnionToFn<U> = U extends any ? (args: U) => void : never
type TestUnionToFn = UnionToFn<T[number]>

export type UnionToIntersection<U> = (U extends any ? (args: U) => void : never) extends (
  args: infer I
) => void
  ? I
  : never

export type TestUnionToIntersection<U> = UnionToIntersection<T[number]>

function combine<T extends object[]>(...args: T): UnionToIntersection<T[number]>
function combine<T extends object[]>(...t: T) {
  return t.reduce((pre, cur, index) => {
    return { ...pre, ...cur }
  }, {})
}

//const combineObj=combine({username:"wangwu",age:23},{phone:"111"})
