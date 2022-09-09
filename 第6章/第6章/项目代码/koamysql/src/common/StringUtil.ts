class StringUtil{
       static isNotEmpty(str:string){
              return str!==null && str.length>0
       }
       static toNumber = (val: any): any => {
       const n = parseFloat(val)
       return isNaN(n) ? val : n
     }

}


export const {isNotEmpty,toNumber}=StringUtil
