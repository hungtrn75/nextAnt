//const { IntlMiddle } =require("./serverMiddle/IntlMiddle")
const express = require('express')
const next = require('next')
const accepts = require('accepts')
const { parse } = require('url')
const glob = require('glob')
const { basename } = require('path')
const { readFileSync } = require('fs')
const cors = require('cors')

const {
  ApolloMiddleInterFace,
  ApolloMiddle
} = require('./serverMiddle/apolloMiddle')
const schema = require('./backend')

const port = process.env.PORT || 3000

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(cors())

  ApolloMiddle(server, schema)
  ApolloMiddleInterFace(server)

  server.post('/login', (req, res) => {
    console.log('login')
  })
  server.get('*', (req, res) => handle(req, res))
  server.listen(port, err => {
    if (err) throw err
    console.log(`> ready  on http://localhost:${port}`)
  })
})

// const getMessages = (locale) => {
//   return require(`./lang/${locale}.json`)
// }
// const languages = glob.sync('./lang/*.json').map((f) => basename(f, '.json'))

// const localeDataCache = new Map()

// const getLocaleDataScript = (locale) => {
//   const lang = locale.split('-')[0]
//   if (!localeDataCache.has(lang)) {
//     const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`)
//     const localeDataScript = readFileSync(localeDataFile, 'utf8')
//     localeDataCache.set(lang, localeDataScript)
//   }
//   return localeDataCache.get(lang)
// }
// server.use((req, res, next) => {
//   const parsedUrl = parse(req.url, true)
//   const accept = accepts(req)
//   console.log('=====req.query====')
//   // console.log(parsedUrl)
//   //這邊會抓取header去判斷網頁客戶端的類別
//   let locale = accept.language(languages)
//   locale = (req.query.locale) ? req.query.locale : locale ? locale : 'en'
//   //locale = locale ? locale : 'en'
//   // console.log('locale')
//   // console.log(locale)
//   req.locale = locale
//   //req.localeDataScript = getLocaleDataScript(locale)
//   req.messages = getMessages(locale)

//   next()
// })
