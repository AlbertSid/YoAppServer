'use strict'

var Router = require('koa-router')
var User = require('../app/controllers/user')// 用户的控制器
var App = require('../app/controllers/app')

module.exports = function () {
  var router = new Router({prefix: '/api/1'})
  /* User */
  router.get('/u/signup', User.signup)
  // router.post('/u/signup', User.signup)
  router.post('/u/verify', User.verify)
  router.post('/u/update', User.update)
  // App
  router.post('/signature', App.signature)

  return router
}

// App.use(function * (next) {
//   console.log(this.href)
//   console.log(this.method)
//   this.body = {
//     success: true
//   }
//   yield next
// })
