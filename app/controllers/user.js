'use strict'
var mongoose = require('mongoose')
var User = mongoose.model('User')
var xss = require('xss')

exports.signup = function * (next) { // 登录
  // var phoneNumber = this.request.body.phoneNumber  // post 请求获取参数
  var phoneNumber = this.query.phoneNumber // get 请求获取参数
	console.log(phoneNumber)
  var user = yield User.findOne({phoneNumber: phoneNumber}).exec() // 调用exec之后就是一个Promise

  if (!user) { // 没有用户
    user = new User({phoneNumber: xss(phoneNumber)})
  } else {
    user.verifyCode = '1212' // 已经有的用户更新一个新的码
  }

  // 储存user
  try {
		console.log(user)
    user = yield user.save()
  } catch (e) {
    this.body = {
      success: false
    }
    return
  }

  this.body = {
    success: true
  }
}

exports.verify = function * (next) { // 注册
  this.body = {
    success: true
  }
}

exports.update = function * (next) { // 更新用户资料
  this.body = {
    success: true
  }
}
