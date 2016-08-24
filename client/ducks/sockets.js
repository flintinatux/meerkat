const append = require('ramda/src/append')
const assoc  = require('ramda/src/assoc')
const concat = require('ramda/src/concat')
const K      = require('ramda/src/always')

const { action, combine, handle } = require('puddles')

const prefix = concat('meerkat/websockets/')

const BODY           = prefix('BODY')
const INSERT_MESSAGE = prefix('INSERT_MESSAGE')
const RESET          = prefix('RESET')

const body = handle('', {
  [ BODY  ]: (_, body) => body,
  [ RESET ]: K('')
})

const byId = handle({}, {
  [ INSERT_MESSAGE ]: (state, model) => assoc(model.id, model, state)
})

const ids = handle([], {
  [ INSERT_MESSAGE ]: (state, model) => append(model.id, state)
})

const messages = combine({ byId, ids })

const reducer = combine({ body, messages })

reducer.body          = action(BODY)
reducer.insertMessage = action(INSERT_MESSAGE)
reducer.reset         = action(RESET)

module.exports = reducer
