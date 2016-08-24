const assoc  = require('ramda/src/assoc')
const concat = require('ramda/src/concat')
const flip   = require('ramda/src/flip')

const { action, handle } = require('puddles')

const prefix = concat('meerkat/time/')

const TICK  = prefix('TICK')
const TIMER = prefix('TIMER')

const init = { time: Date.now() }

const reducer = handle(init, {
  [ TICK  ]: flip(assoc('time')),
  [ TIMER ]: flip(assoc('timer'))
})

reducer.tick  = action(TICK)
reducer.timer = action(TIMER)

module.exports = reducer
