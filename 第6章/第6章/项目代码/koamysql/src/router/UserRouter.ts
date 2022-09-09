import { Context } from 'koa'
import Router from 'koa-router'

import { success, fail } from '../common/ResResult'
import userDao, { Userinfo } from '../modules/userinfo/dao/UserDao'
//import userDaoOrm from '../dao/UserDaoOrm'

const router = new Router()
router.prefix('/usermodule')

router.get('/findByUsmAndAddr', async (ctx: Context) => {
  ctx.body = success(await userDao.findByUsmAndAddr())
})

// router.get('/findByLikeWithOrm/:key', async (ctx: Context) => {
//   const { key } = ctx.params
//   ctx.body = success(await userDaoOrm.findByLike(key))
// })
router.get('/findUserWithPager/:pageNo/:pageSize', async (ctx: Context) => {
  const { pageNo, pageSize } = ctx.params
  const offset = (pageNo - 1) * pageSize
  ctx.body = success(await userDao.findUserWithPager(offset, parseInt(pageSize)))
})
router.get('/countTotal', async (ctx: Context) => {
  ctx.body = success(await userDao.countUserinfo())
})
router.get('/findByLike/:key', async (ctx: Context) => {
  const { key } = ctx.params
  ctx.body = success(await userDao.findByLike(key))
})

router.get('/findByProps', async (ctx: Context) => {
  ctx.body = success(await userDao.findByProps())
})

router.get('/findAllUser', async (ctx: Context) => {
  const dbUserinfo = await userDao.findAllUser()
  console.log('dbUserinfo:', dbUserinfo)
  ctx.body = success(dbUserinfo)
})

router.post('/addUser', async (ctx) => {
  const userinfo: Userinfo = ctx.request.body
  const dbUserinfo = userDao.addUser(userinfo)
  ctx.body = success(dbUserinfo)
})

module.exports = router
