const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieSession = require('cookie-session')

require('./src/models/customer')

const schema = require('./src')
const {
  apolloMiddleInterFace,
  apolloMiddle
} = require('./middleware/apolloMiddle')
const jwtVerify = require('./middleware/jwtVerify')
const envs = require('./config/envs')

mongoose.Promise = global.Promise
mongoose.connect(envs.mongoURI)

const port = process.env.PORT || 8080

const server = express()

server.use(cors({ credentials: true, origin: envs.origin }))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [envs.cookieKey]
  })
)
server.use(jwtVerify)

apolloMiddle(server, schema)
apolloMiddleInterFace(server)

server.post('/auth/login', (req, res) => {
  let loginInfo = { success: false }
  if (req.body.account === 'admin') {
    const token = jwt.sign({ admin: 'admin' }, envs.secret, {
      expiresIn: 60 * 60 * 24
    })
    loginInfo = {
      success: true,
      message: 'login success',
      level: 999,
      token
    }
    req.session.loginInfo = JSON.stringify(loginInfo)
    res.json(loginInfo)
  } else {
    req.session.loginInfo = JSON.stringify(loginInfo)
    res.json()
  }
})

server.listen(port, err => {
  if (err) throw err
  console.log(`> ready on http://localhost:${port}`)
})
