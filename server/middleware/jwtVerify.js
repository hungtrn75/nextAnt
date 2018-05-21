const jwt = require('jsonwebtoken')

const envs = require('../config/envs')

module.exports = (req, res, next) => {
  const accessToken = req.headers.authorization

  if (accessToken) {
    jwt.verify(accessToken, envs.secret, (err, decoded) => {
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
