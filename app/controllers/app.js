'use strict'

exports.signature = function * (next) { // 签名
  this.body = {
    success: true
  }
}
