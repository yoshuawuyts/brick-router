# brick-router
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Static asset server that can write to files.

## Installation
```bash
$ npm install brick-router
```

## Usage
```js
const brick = require('brick-router')
const fs = require('fs')

const router = brick()

router.on('/index.html', cb => {
  const rs = fs.createReadStream('index.html')
  cb(null, rs)
})

// use as router
router.match('/index.html', (err, res) => {
  if (err) throw err
  res.pipe(process.stdout)
})

// write to file
router.build(__dirname + '/my-dirname')
```

## Why?
In development an application usually goes through 3 stages:
- __experiment__ - some html, css, js to toy around locally
- __static__ - static files, usually hosted on GitHub pages
- __server__ - application with a working backend

When switching stages it's common to throw out your build process, and start
from scratch. `brick-router` allows you to keep the same build process by
serving files both in-memory (for experimentation and servers) and being able
to write to the filesystem (for static pages).

## API
### router = brick()
Create a new router.

### router.on(filename, cb(err, data|stream))
Register a new path in the router. The callback either accepts data or a
ReadableStream.

### router.match(filename, cb(err, res))
Match a path on the router, pass in an optional callback to the router which
can later be called.

### router.build(directory, cb(err, res))
Execute all routes and write the output to a directory tree so it can be served
statically. Calls an optional callback on completion.

## See Also
- [wayfarer](https://github.com/yoshuawuyts/wayfarer) - composable trie based router
- [chokidar](https://github.com/paulmillr/chokidar) - wrapper around node.js fs.watch / fs.watchFile
- [brick-server](https://github.com/yoshuawuyts/brick-server) - HTTP frontend

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/brick-router.svg?style=flat-square
[npm-url]: https://npmjs.org/package/brick-router
[travis-image]: https://img.shields.io/travis/yoshuawuyts/brick-router.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/brick-router
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/brick-router.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/brick-router?branch=master
[downloads-image]: http://img.shields.io/npm/dm/brick-router.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/brick-router
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
