const assoc  = require('ramda/src/assoc')
const concat = require('ramda/src/concat')
const flip   = require('ramda/src/flip')

const { action, handle } = require('../lib/redux')

const prefix = concat('meerkat/time/')

const TICK = prefix('TICK')

const init = { time: Date.now() }

const reducer = handle(init, {
  [ TICK ]: flip(assoc('time'))
})

reducer.tick = action(TICK)

module.exports = reducer
