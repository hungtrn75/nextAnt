const jwt = require('jsonwebtoken')
const envs = require('../config/envs')

module.exports = (req, res, next) => {
  //req.user = ''
  console.log('req', req)
  const accessToken = req.headers.authorization
  //  next()
  if (accessToken) {
    jwt.verify(accessToken, envs.secret, (err, decoded) => {
      if (err) {
        throw new Error("can't pass")
      } else {
        req.user = decoded.admin
      }
      next()
    })
  } else {
    next()
  }
}
