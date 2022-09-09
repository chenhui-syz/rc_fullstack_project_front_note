import { isNotEmpty } from '../common/StringUtil'
import baseDao from './BaseDao'
import Userinfo from '../interfaces/Userinfo'
class UserDao {
  constructor() {
    console.log('创建UserDao....')
  }
  static userDao: UserDao = new UserDao()
  findUserinfo(username: string, psw: string) {
    let sql = `select * from userinfo  where 1=1  `
    if (isNotEmpty(username)) {
      sql += ` and username='${username}' `
    }
    if (isNotEmpty(psw)) {
      sql += ` and psw='${psw}' `
    }
    return baseDao.query<Userinfo[]>(sql)
  }
}

export default UserDao.userDao
