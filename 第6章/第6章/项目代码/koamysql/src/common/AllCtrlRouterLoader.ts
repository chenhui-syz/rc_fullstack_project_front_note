import Koa, { Context } from 'koa'
import path from 'path'
import fs from 'fs'
import body from 'koa-body'
import json from 'koa-json'
import Router from 'koa-router'
import globalException from './GlobalExce'
class AllCtrlRouterLoader {
  app!: Koa
  static allRouterLoader: AllCtrlRouterLoader = new AllCtrlRouterLoader()
  init(app: Koa) {
    this.app = app
    this.loadMiddleAware() // 加载中间件
    this.storeRootRouterToCtx() // 保存根路由
    this.loadAllCtrlRouterWrapper() // 加载控制器路由
    this.listen() // 监听
  }
  loadMiddleAware() {
    this.app.use(json())
    this.app.use(body())
    this.app.use(globalException)
  }
  storeRootRouterToCtx() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang')
    this.app.context.rootRouter = rootRouter
    this.app.use(rootRouter.routes())
  }
  //  1. 加载所有路由文件数组
  getFiles(dir: string) {
    return fs.readdirSync(dir)
  }
  //  2. 加载所有路由文件绝对路径数组
  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), '/src/controller')
    const allFiles = this.getFiles(dir)
    const allFullFilePaths: string[] = []
    for (let file of allFiles) {
      console.log('file:', file)
      if (this.isCtrlFile(file)) {
        const fullFilePath = dir + '\\' + file
        allFullFilePaths.push(fullFilePath)
      }
    }
    return allFullFilePaths
  }
  isCtrlFile(file: string) {
    const fileName: string = file.substring(file.lastIndexOf('\\') + 1, file.lastIndexOf('.'))
    const extensionName: string = file.substring(file.lastIndexOf('.'), file.length)
    return fileName.indexOf('Controller') !== -1 && extensionName === '.ts'
  }
  loadAllCtrlRouterWrapper() {
    //  3.1  调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths()
    console.log('allFullFilePaths:', allFullFilePaths)
    //  3.2  调用加载所有二级路由到一级路由方法
    this.loadAllRouter(allFullFilePaths)
  }

  loadAllRouter(allFullFilePaths: string[]) {
    console.log('allFullFilePaths:', allFullFilePaths)
    for (let fullFilePath of allFullFilePaths) {
      require(fullFilePath)
    }
  }
  listen() {
    this.app.listen(3003)
    console.log('在3003端口监听....')
  }
}

export default AllCtrlRouterLoader.allRouterLoader
