const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const nextHandle = nextApp.getRequestHandler() //part of next config
const { parse } = require('url')

nextApp.prepare().then(() => {
  // express code here
  const expressServer = express()
  expressServer.use(bodyParser.json());
  expressServer.use(bodyParser.urlencoded({ extended: true }));
  expressServer.get('/pages/index', (req, res) => {
    return nextApp.render(req, res, '/pages/index');
  });
  expressServer.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    console.log(parsedUrl)
    return nextHandle(req, res, parsedUrl) // for all the react stuff
  })

  expressServer.listen(PORT, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`)
  })
})
