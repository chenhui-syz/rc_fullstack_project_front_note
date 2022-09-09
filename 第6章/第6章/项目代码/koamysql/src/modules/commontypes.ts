// 第一阶段
export type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K]
}

export type EleOfArr<T> = T extends Array<infer E> ? E : never
export function getSubItemsFrmArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>>(
  t: T,
  ...keys: K[]
): Pick<EleOfArr<T>, K>[] {
  return t.map((item) => {
    return keys.reduce((pre, cur, index) => {
      return { ...pre, [keys[index]]: item[keys[index]] }
    }, {})
  }) as Pick<EleOfArr<T>, K>[]
}

// 第二阶段
// 1
export function getOneItemValuesFrmArr<
  T extends ItemType<T>[],
  K extends keyof EleOfArr<T>,
  E = EleOfArr<T>
>(arr: T, k: K) {
  return arr.map(({ [k]: v }: E) => {
    return v
  })
}
//2
function getNoReptValsItem(arr: any[]) {
  const data: any[] = []
  return arr.filter((item) => !data.includes(item) && data.push(item))
}
//3
export function getNoReptItem<T extends ItemType<T>[], K extends keyof EleOfArr<T>>(
  arr: T,
  k: K
): ItemType<T>[] {
  const data: any[] = []
  // (1)
  const oneItemValues = getOneItemValuesFrmArr(arr, k)
  // (2)
  const noReptOneItemValues = getNoReptValsItem(oneItemValues)
  //(3)
  arr.map((item) => {
    if (noReptOneItemValues.includes(item[k])) {
      noReptOneItemValues.splice(noReptOneItemValues.indexOf(item[k]), 1)
      data.push(item)
    }
  })
  return data
}

export function combineRelativeCtgy<T extends ItemType<T>[]>(
  arr: T,
  realtiveKey: string,
  realtiveValues: any
) {
  return arr.map((item) => {
    return combine(item, { [realtiveKey]: realtiveValues })
  })
}

// 第三阶段
type UnionToIntersection<U> = (U extends any ? (args: U) => void : never) extends (
  args: infer I
) => void
  ? I
  : never
export function combine<T extends object[]>(...args: T): UnionToIntersection<T[number]>
export function combine<T extends object[]>(...t: T) {
  return t.reduce((pre, cur, index) => {
    return { ...pre, ...cur }
  }, {})
}
