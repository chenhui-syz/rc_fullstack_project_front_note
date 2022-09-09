import { combine } from '../tstypes'
import Userinfo from '../interfaces/Userinfo'

import userinfoModel from '../model/userinfo'
class UserDaoModel {
  static userDaoModel: UserDaoModel = new UserDaoModel()
  async findUserinfo(): Promise<userinfoModel[]> {
    return await userinfoModel.findAll({
      raw: true,
    })
  }
  async addUser(userinfo: Userinfo) {
    const userModelInstace = new userinfoModel()
    const usermodel = combine(userModelInstace, userinfo)
    return await userinfoModel.create(usermodel)
  }
}

export default UserDaoModel.userDaoModel
