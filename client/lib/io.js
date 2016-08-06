const compose = require('ramda/src/compose')
const K = require('ramda/src/always')

const { typeEq } = require('../lib/util')

const IO = run => ({
  map: f => IO(compose(f, run)),
  run
})

IO.is = typeEq('run', 'function')

IO.of = x => IO(K(x))

module.exports = IO
