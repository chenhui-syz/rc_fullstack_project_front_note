enum Code {
  SUCESS = 200,
  SERVERERROR = 500,
}
 class ResRsult {
  static success(data: any = undefined, msg: any = '') {
    const code: Code = Code.SUCESS
    return { data, msg, code }
  }
  static fail(msg: any = '') {
    const code: Code = Code.SERVERERROR
    return { undefined, msg, code }
  }
}
export let {success,fail}=ResRsult


