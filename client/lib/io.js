const compose = require('ramda/src/compose')
const K = require('ramda/src/always')

const IO = runIO => ({
  map: f => IO(compose(f, runIO)),
  runIO
})

IO.of = x => IO(K(x))

IO.runIO = io => io.runIO()

module.exports = IO
