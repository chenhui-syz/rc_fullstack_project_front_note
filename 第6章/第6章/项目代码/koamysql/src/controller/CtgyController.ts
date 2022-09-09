import { Context } from 'koa'
import { get, post, Controller } from '../decorator'
import { success } from '../common/ResResult'
import ctgyDao from '../modules/ctgy/dao/CtgyDao'
// TS 装饰器 重构 Koa 路由中的方法装饰器
@Controller('/ctgymodule')
class CtgyController {
  @get('/findSecThrdCtgys/:firstctgyid')
  async findSecThrdCtgys(ctx: Context) {
    const { firstctgyid } = ctx.params
    ctx.body = success(await ctgyDao.findSecThrdCtgys(firstctgyid))
  }
}
