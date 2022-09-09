import { Op, Sequelize } from 'sequelize'
import { model } from  '../defmodel'
//import model from '../../..//modules/decormodel/Userinfo'
class UserDao {
  static userDao: UserDao = new UserDao()
  addUser(userinfo: Userinfo) {
    return model.create(userinfo)
  }
  findAllUser() {
    return model.findAll({
      raw: true,
    })
  }
  findByProps() {
    return model.findAll({
      raw: true,
      attributes: ['username', 'psw'],
    })
  }
  findByLike(key: string) {
    const searchKey = `%${key}%`
    return model.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: searchKey,
        },
      },
    })
  }
  findByUsmAndAddr() {
    return model.findAll({
      raw: true,
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: '王%',
            },
          },
          {
            address: 'wuhan',
          },
        ],
      },
    })
  }
  countUserinfo() {
    return model.findAll({
      raw: true,
      group: 'address',
      attributes: ['address', [Sequelize.fn('count', Sequelize.col('valid')), 'totalcount']],
      where: {
        valid: 1,
      },
    })
  }

  findUserWithPager(offset:number,pageSize:number) {
    return model.findAll({
      raw: true,
      limit:pageSize,
      offset,
    })
  }
}
export default UserDao.userDao
//export const { addUser, findAllUser, findByProps, findByLike, findByUsmAndAddr } = UserDaoDefine
export type Userinfo = {
  userid: number
  username: string
  psw: string
  address: string
  valid: number
}
