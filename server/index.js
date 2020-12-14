const express = require('express')

const consola = require('consola')

const { Nuxt, Builder } = require('nuxt')

const app = express()

// import and set Nuxt.js options

const config = require('../nuxt.config.js')

config.dev = !(process.env.NODE_ENV === 'production')

// eslint-disable-next-line(no console)

async function start() {
  // init Nuxt.js

  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)

    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server

  app.listen(port, host)

  consola.ready({
    message: `Server Listening on http://${host}:${port}`,
    badge: true,
  })
}

start()
