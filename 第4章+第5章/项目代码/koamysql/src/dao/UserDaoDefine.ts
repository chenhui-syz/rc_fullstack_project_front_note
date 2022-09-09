import Userinfo from '../interfaces/Userinfo'
import userModel, { UserModel } from '../definemodel/UserinfoDefine'
class UserDaoDefine {
  static userDao: UserDaoDefine = new UserDaoDefine()
  async findUserinfo(): Promise<UserModel[]> {
    return (await userModel.findAll({
      raw: true,
    })) as UserModel[]
  }

  async addUser(userinfo: Pick<Userinfo, keyof Userinfo>) {
    return (await userModel.create(userinfo)) as UserModel
  }
}

export default UserDaoDefine.userDao
