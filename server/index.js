const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

require('./src/models/customer')

const schema = require('./src')
const {
  apolloMiddleInterFace,
  apolloMiddle
} = require('./middleware/apolloMiddle')
const envs = require('./config/envs')

mongoose.Promise = global.Promise
mongoose.connect(envs.mongoURI)

const port = process.env.PORT || 8080

const server = express()

server.use(cors())

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

apolloMiddle(server, schema)
apolloMiddleInterFace(server)

server.post('/auth/login', (req, res) => {
  //const params = JSON.parse(req.body)
  // console.log('req.body')
  // console.log(req.body)
  // console.log('req.query')
  // console.log(req.query)
  // console.log(' ')
  // console.log(req.params)

  if (req.body.account === 'admin') {
    var token = jwt.sign({ admin: 'admin' }, 'gg', {
      expiresIn: 60 * 60 * 24
    })
    res.json({
      success: true,
      message: 'login success',
      level: 999,
      token
    })
  } else {
    res.json({
      success: false
    })
  }
})

server.listen(port, err => {
  if (err) throw err
  console.log(`> ready on http://localhost:${port}`)
})
