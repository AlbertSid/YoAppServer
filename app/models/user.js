'use strict'
// 建模用户数据模型
var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  phoneNumber: {
    unique: true,
    type: String
  },
  areaCode: String, // 区号
  verifyCode: String, //
  accessToken: String, // token
  nickname: String, // 昵称
  gender: String, // 性别
  breed: String, // 种类
  age: String, // 年龄
  avatar: String,
  meta: { // 时间
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('User', UserSchema)
