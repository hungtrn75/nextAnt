const express = require('express')
const mongoose = require('mongoose')
const next = require('next')
const cors = require('cors')

require('./backend/models/customer')
const schema = require('./backend')
const {
  apolloMiddleInterFace,
  apolloMiddle
} = require('./serverMiddle/apolloMiddle')
const keys = require('./config/keys')

mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI)

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(cors())

  apolloMiddle(server, schema)
  apolloMiddleInterFace(server)

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> ready on http://localhost:${port}`)
  })
})
