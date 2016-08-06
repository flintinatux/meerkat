const compose = require('ramda/src/compose')
const K = require('ramda/src/always')

const { typeEq } = require('./util')

const IO = runIO => ({
  map: f => IO(compose(f, runIO)),
  runIO
})

IO.is = typeEq('runIO', 'function')

IO.of = x => IO(K(x))

module.exports = IO
