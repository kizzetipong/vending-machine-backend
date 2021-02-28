const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const apiRoutes = require('./server/routers/api')
const opensocket = require('./server/socket/socket')

const port = process.env.PORT || 3002

// CORS middleware
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

try {
  const server = express()

  const httpserver = http.createServer(server, { 'log level': 0, 'match origin protocol': 'yes' })
  server.use(bodyParser.json())
  server.use(allowCrossDomain)

  const socketIo = opensocket(httpserver)
  server.set('socketIo', socketIo)

  // handle trailing slash
  server.use((req, res, next) => {
    const test = /\?[^]*\//.test(req.url)
    if (req.url.substr(-1) === '/' && req.url.length > 1 && !test) { res.redirect(301, req.url.slice(0, -1)) } else { next() }
  })

  server.use('/api', apiRoutes)

  httpserver.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
} catch (err) {
  console.error(err)
  process.exit(1)
}
