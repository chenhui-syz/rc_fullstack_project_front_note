import { Context } from 'koa'
import Router from 'koa-router'
import { success, fail } from '../common/ResResult'
import Userinfo from '../interfaces/Userinfo'
import userDao from '../dao/UserDao'
import test from '../dao/test'
import UserDaoOrm from '../dao/UserDaoDefine'
//import { getSubItemList } from '../tstypes'
//import { UserModel } from '../definemodel/UserinfoDefine'
const router = new Router()
router.prefix('/usermodule')

router.get('/findUserinfo/:username/:psw', async (ctx: Context) => {
  const { username, psw } = ctx.params
  console.log('执行路由请求findUserinfo开始....')
  const userinfos: Userinfo[] = await userDao.findUserinfo(username, psw)
  console.log('userinfos:', userinfos)
  const dbUserinfo = userinfos[0]
  console.log('userinfos[0]:', userinfos[0])
  ctx.body = success(`欢迎! ${dbUserinfo.psw}`)
})

router.get('/findAllUser', async (ctx: Context) => {
  const usermodel = await UserDaoOrm.findUserinfo()
  //console.log('usermodel1:', usermodel)
  //const dbUserinfo = getSubItemList(usermodel, 'userid', 'username', 'psw', 'address', 'valid')
  ctx.body = usermodel
})

router.post('/addUser', async (ctx) => {
  const user: Userinfo = ctx.request.body
  console.log(user)
  console.log("Test")
  const dbUser = await UserDaoOrm.addUser(user)
  console.log('dbUser:', dbUser)
  ctx.body = dbUser
})

module.exports = router
