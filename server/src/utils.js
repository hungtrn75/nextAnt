const jwt = require('jsonwebtoken')

const config = require('../config')

function getUserId(ctx) {
  const userToken = ctx.req.session.userToken
  if (userToken) {
    const { userId } = jwt.verify(userToken, config.secret)
    return userId
  }
  throw new Error('Not authenticated')
}

module.exports = {
  getUserId
}
