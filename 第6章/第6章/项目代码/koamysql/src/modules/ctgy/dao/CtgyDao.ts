import { Op, Sequelize } from 'sequelize'
import { sequelize } from '../../../modules/BaseDao'
import convert from '../moduletypes'
class CtgyDao {
  static userDao: CtgyDao = new CtgyDao()

  async findSecThrdCtgys(firstctgyid: number) {
    const sql = `select * from secondctgy sc inner join thirdctgy tc on sc.secondctgyid=tc.secctgyid where sc.firstctgyid=${firstctgyid}`
    const secThrCtgys: any[] = (await sequelize.query(sql))[0]
    return convert(secThrCtgys)
  }
}
export default CtgyDao.userDao
