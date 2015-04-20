# brick-router
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Modular router for serving static assets.

## Installation
```bash
$ npm install brick-router
```

## Usage
```js
const post = require('@myApp/createPost')
const brick = require('brick-router')
const posts = require('./posts.json')

const router = brick()

module.exports = router

router.on('/', (cb) => cb(null, '/'))
router.on('/index.html', cb => cb(null, 'html'))
router.on('/index.css', cb => cb(null, 'css'))

// register all blogposts
posts.forEach(post => router.on(post, posts(post, cb)))

router.match('/index.html', function (err, data) {
  console.log(data)
  // => html
})
```

## Why?
There should be no disparity in file serving during development and production.
Current tools either require ecosystem buy-in (grunt, gulp) or focus on a 
specific part of the process (wzrd for development, metalsmith for production).

`brick-router` can execute arbitrary code for each page during development 
(e.g. watch files and rebuild on changes). When moving to production call
`router.build('/mydir')` to execute all routes and write the output to a
directory tree so it can be served statically. 

`'tools.production' === 'tools.development'`

## API
The api is heavily copied from [wayfarer](https://github.com/yoshuawuyts/wayfarer) to maintain a sense of familiarity
between non-method routers.
### router = brick()
Create a new router.

### router.on('myPath', cb => cb())
Register a new path in the router.

### router.match('somePath', () => {})
Match a path on the router, pass in an optional callback to the router which
can later be called.

### router.build('/output/dir', () => {})
Execute all routes and write the output to a directory tree so it can be served
statically. Calls an optional callback on completion.

## Note on livereload
This has not been tested yet, but reloads could be called through event
listeners or similar. The livereload server can just live in a separate
function.

## See Also
- [wayfarer](https://github.com/yoshuawuyts/wayfarer) - client-side router
- [watchify](https://github.com/substack/watchify) - watch mode for browserify builds
- [chokidar](https://github.com/paulmillr/chokidar) - A neat wrapper around node.js fs.watch / fs.watchFile
- [wzrd](https://github.com/maxogden/wzrd) - Super minimal browserify development server

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
