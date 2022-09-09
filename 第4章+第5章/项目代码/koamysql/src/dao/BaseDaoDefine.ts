import dbConConf from '../conf/DbConfig'
import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
class BaseDaoDefine {
  static baseDaoOrm: BaseDaoDefine = new BaseDaoDefine()
  sequelize!: Sequelize
  constructor() {
    console.log('初始化sequelize...')
    this.initSeqConf('mysql')
  }
  initSeqConf(dialect: Dialect) {
    //创建sequelize对象,参数分别为：数据库名称，数据库类型，密码，配置
    let { host, user, password, database, port } = dbConConf.getConf()
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect, //   表示是何种数据库
      define: { timestamps: false, freezeTableName: false },
    })
  }
}

//export default BaseDaoDefine.baseDaoOrm
export const { sequelize } = BaseDaoDefine.baseDaoOrm
