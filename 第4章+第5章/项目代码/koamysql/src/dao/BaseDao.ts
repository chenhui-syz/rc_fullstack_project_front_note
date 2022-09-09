import mysql, { Connection } from 'mysql'
import dBConf from '../conf/DbConfig'
class BaseDao {
  // 所有 Dao 的 通用Dao
  static baseDao: BaseDao = new BaseDao()
  con!: Connection
  constructor() {
    this.connect()
  }
  async connect() {
    this.con = await mysql.createConnection(dBConf.getConf())
  }
  async query<T>(sql: string) {
    return new Promise<T>((resolve, reject) => {
      this.con.query(sql, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

export default BaseDao.baseDao
