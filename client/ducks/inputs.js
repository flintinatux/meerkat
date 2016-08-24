const assoc  = require('ramda/src/assoc')
const concat = require('ramda/src/concat')
const flip   = require('ramda/src/flip')

const { action, handle } = require('puddles')

const prefix = concat('meerkat/inputs/')

const CHANGE = prefix('CHANGE')
const RESET  = prefix('RESET')

const init = { content: '' }

const reducer = handle(init, {
  [ CHANGE ]: flip(assoc('content')),
  [ RESET ]:  assoc('content', '')
})

reducer.change = action(CHANGE)
reducer.reset  = action(RESET)

module.exports = reducer
