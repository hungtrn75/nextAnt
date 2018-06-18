const routes = require('next-routes')()

routes
  .add('/customer', '/customer')
  .add('/product', '/product')
  .add('/presonal', '/presonal')
  .add('/presonal/signup', '/presonal/signup')
  .add('/presonal/login', '/presonal/login')
  .add('/report/demo1', '/report/demo1')
  .add('/report/demo2', '/report/demo2')
  .add('/report/demo3', '/report/demo3')
  .add('/admin/user', '/admin/user')

module.exports = routes
