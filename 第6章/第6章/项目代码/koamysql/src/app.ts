import Koa from 'koa'
import allRouterLoader from './common/AllCtrlRouterLoader'
//import './definemodel'
const app = new Koa()
allRouterLoader.init(app)
