const assoc  = require('ramda/src/assoc')
const concat = require('ramda/src/concat')
const flip   = require('ramda/src/flip')

const { action, handle } = require('puddles')

const prefix = concat('meerkat/random/')

const FACE = prefix('FACE')

const init = { face: 1 }

const reducer = handle(init, {
  [ FACE ]: flip(assoc('face'))
})

reducer.setFace = action(FACE)

module.exports = reducer
