import { secThrCtgys, ItemType, EleOfArr } from './one'
// 1
function getOneItemValuesFrmArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(arr: T, k: K) {
  return arr.map(({ [k]: v }: E) => {
    return v
  })
}
//2 
function getNoReptValsItem(arr: any[]) {
      const data:any[]=[]
      return arr.filter(item=>!data.includes(item)&&data.push(item))
}
//3
export function getNoReptItem<T extends ItemType<T>[], K extends keyof EleOfArr<T> >(arr: T, k: K): ItemType<T>[] {
   const data:any[]=[]
    // (1)
    const oneItemValues=getOneItemValuesFrmArr(arr,k)
    // (2)
    const noReptOneItemValues=getNoReptValsItem(oneItemValues)
    //(3)
    arr.map((item)=>{
          if(noReptOneItemValues.includes(item[k]))
          {
              noReptOneItemValues.splice(noReptOneItemValues.indexOf(item[k]),1)
              data.push(item)
          }
    })
    return data;
}

//console.log("one:",getNoReptItem(secThrCtgys,"secondctgyid"));