const jwt = require('jsonwebtoken')

const envs = require('../config/envs')

module.exports = (req, res, next) => {
  const userToken = req.session.userToken
  if (userToken) {
    jwt.verify(userToken, envs.secret, (err, decoded) => {
      if (err) {
        req.user = ''
      } else {
        req.user = decoded.admin
      }
      next()
    })
  } else {
    next()
  }
}
