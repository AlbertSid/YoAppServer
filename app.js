'use strict'

// 加载用户模型
var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')
var db = 'mongodb://localhost/yoapp' // 数据库地址 yoapp数据名字

mongoose.Promise = require('bluebird') // 把mongoose.Promise设置为bluebird

mongoose.connect(db) // 链接数据库
// 第一种方式
var modelsPath = path.join(__dirname, '/app/models') // 参数：当前目录层级，

var walk = function (modelsPath) { // 读取modelsPath下的所有文件
  fs.readdirSync(modelsPath).forEach(function (file) { // 在遍历
    var filePath = path.join(modelsPath, '/' + file) // 拼接路径
    var stat = fs.statSync(filePath) // 当前路径状态
    if (stat.isFile()) { // 如果是文件
      if (/(.*)\.(js|coffee)/.test(file)) { // 是JS或者coffee
        require(filePath)
      }
    } else if (stat.idDirectory()) {
      walk(filePath)
    }
  })
}

walk(modelsPath)

// 第二种方式
// require('./app/models/user')

var koa = require('koa')
var logger = require('koa-logger')
var session = require('koa-session')
var bodyParser = require('koa-bodyparser')

var app = koa()

app.keys = ['yoApp'] // cookie 会话是session 的关键字
app.use(logger())
app.use(session(app))
app.use(bodyParser())

var router = require('./config/routes')()
// app.use(function * (next) {
//   console.log(this.href)
//   console.log(this.method)
//   this.body = {
//     success: true
//   }
//   yield next
// })

app.use(router.routes()).use(router.allowedMethods())

app.listen(1234)

console.log('listen : 1234')
