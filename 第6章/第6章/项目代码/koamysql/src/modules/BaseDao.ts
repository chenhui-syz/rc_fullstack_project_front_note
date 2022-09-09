import path from 'path'
import dbConConf from '../conf/DbConfig'
import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
class BaseDao {
  static baseDao: BaseDao = new BaseDao()
  sequelize!: Sequelize
  constructor() {
    this.initSeqConf('mysql')
  }
  initSeqConf(dialect: Dialect) {
    //创建sequelize对象,参数分别为：数据库名称，数据库类型，密码，配置
    let { host, user, password, database, port } = dbConConf.getConf()
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect, //   表示是何种数据库
      define: { timestamps: false, freezeTableName: true },
      pool: {
        //数据库连接池
        max: 5, //最大连接对象的个数
        // 最小连接数
        min: 0,
        // idle 这个属性控制连接池中空闲连接的最大空闲时间，单位为毫秒，只有当连接池中连接数量大于最小连接数量时会生效。
        idle: 10000, // 空闲连接最长等待时间，单位为毫秒
        acquire: 100, // 表示一条 sql 查询在获取连接资源之前的最长等待时间，单位 秒
      },
    })
  }

  addModels() {
    const modelPath = path.join(process.cwd(), '/src/modules/decormodel')
    this.sequelize.addModels([modelPath])
  }
}
const baseDao = BaseDao.baseDao
//baseDao.addModels()
export const { sequelize } = baseDao
