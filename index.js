const parallel = require('run-parallel')
const error = require('http-errors')
const assert = require('assert')
const mkdirp = require('mkdirp')
const noop = require('noop2')
const path = require('path')
const fs = require('fs')

const brick = Brick.prototype

module.exports = Brick

// create a new router
// -> null
function Brick () {
  if (!(this instanceof Brick)) return new Brick()
  this.router = {}
}

// define a new path
// str, fn -> obj
brick.on = function (path, cb) {
  assert.equal(typeof path, 'string', 'path should be a string')
  cb = cb || noop
  this.router[path] = cb
  return this
}

// match a route against the paths
// str, fn -> null
brick.match = function (path, cb) {
  assert.equal(typeof path, 'string', 'path should be a string')
  cb = cb || noop
  const route = this.router[path]
  if (!route) return cb(error(404))
  route(cb)
}

// execute all paths and write
// the results to a directory tree
// str, fn -> null
brick.build = function (dir, cb) {
  assert.equal(typeof dir, 'string', 'dir should be a string')
  cb = cb || noop
  const ctx = this

  const fns = Object.keys(this.router).map(function (route) {
    return function (innerCb) {
      const split = route.split('/')
      split.pop()
      const loc = split.join('/')
      ctx.router[route](routeCb)

      function routeCb (data) {
        assert.ok(data, 'no data retrieved')
        mkdirp(path.join(dir, loc), function (err) {
          if (err) cb(err)
        })

        const ws = fs.createWriteStream(path.join(dir, route))
        ws.once('open', function () {
          this.write(data)
          this.end()
        })
        ws.once('close', innerCb)
      }
    }
  })

  parallel(fns, cb)
}
