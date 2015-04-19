const rimraf = require('rimraf')
const test = require('tape')
const fs = require('fs')

const brick = require('./')

test('should assert input types', function (t) {
  t.plan(1)
  const router = brick()
  t.throws(router.on, /should be a string/)
})

test('should save paths as object keys', function (t) {
  t.plan(1)
  const router = brick()
  router.on('/foo', function () {
    t.pass('call fn')
  })
  router.router['/foo']()
})

test('.match() should assert input types', function (t) {
  t.plan(1)
  const router = brick()
  t.throws(router.match, /should be a string/)
})

test('.match() should call object keys', function (t) {
  t.plan(2)
  var count = 0
  const router = brick()
  router.on('/foo', function (cb) {
    count += 1
    t.pass('call fn')
    cb()
  })
  router.match('/foo', function () {
    t.equal(count, 1, 'count')
  })
})

test('.build() should assert input types', function (t) {
  t.plan(1)
  const router = brick()
  t.throws(router.build, /should be a string/)
})

test('.build() should write file results to disk', function (t) {
  t.plan(5)
  const router = brick()
  router.on('/foo.txt', function (cb) {
    cb('my amazing data')
  })

  router.build(__dirname + '/derp', function (err, res) {
    t.ifError(err)
    fs.readFile(__dirname + '/derp/foo.txt', 'utf8', function (err, res) {
      t.ifError(err)
      t.equal(res, 'my amazing data')
      rimraf(__dirname + '/derp', function (err) {
        t.ifError(err)
        t.pass('rm files')
      })
    })
  })
})
