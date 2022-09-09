import {
  getNoReptItem,
  combineRelativeCtgy,
  combine,
  EleOfArr,
  getSubItemsFrmArr,
} from '../commontypes'

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
