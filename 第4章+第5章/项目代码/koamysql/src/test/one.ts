
import path from 'path'
console.log("process.cwd():",process.cwd());// 执行环境路径
const fullpath=path.join(process.cwd(), '/src/router')
console.log("fullpath:",fullpath)
console.log(__dirname);// 被执行的文件所在的路径
export {}