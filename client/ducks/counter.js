const concat = require('ramda/src/concat')
const dec    = require('ramda/src/dec')
const inc    = require('ramda/src/inc')
const K      = require('ramda/src/always')

const { action, handle } = require('puddles')

const prefix = concat('meerkat/counter/')

const DEC   = prefix('DEC')
const INC   = prefix('INC')
const RESET = prefix('RESET')

const reducer = handle(0, {
  [ DEC ]:   dec,
  [ INC ]:   inc,
  [ RESET ]: K(0)
})

reducer.dec   = action(DEC)
reducer.inc   = action(INC)
reducer.reset = action(RESET)

module.exports = reducer
