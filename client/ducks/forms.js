const assoc  = require('ramda/src/assoc')
const concat = require('ramda/src/concat')
const flip   = require('ramda/src/flip')

const { action, handle } = require('../lib/redux')

const prefix = concat('meerkat/forms/')

const SET_AGE      = prefix('SET_AGE')
const SET_CONFIRM  = prefix('SET_CONFIRM')
const SET_NAME     = prefix('SET_NAME')
const SET_PASSWORD = prefix('SET_PASSWORD')
const VALIDATE     = prefix('VALIDATE')

const init = {
  age:      null,
  confirm:  '',
  name:     '',
  password: '',
  validate: false
}

const reducer = handle(init, {
  [ SET_AGE ]:      flip(assoc('age')),
  [ SET_CONFIRM ]:  flip(assoc('confirm')),
  [ SET_NAME ]:     flip(assoc('name')),
  [ SET_PASSWORD ]: flip(assoc('password')),
  [ VALIDATE ]:     assoc('validate', true)
})

reducer.setAge      = action(SET_AGE)
reducer.setConfirm  = action(SET_CONFIRM)
reducer.setName     = action(SET_NAME)
reducer.setPassword = action(SET_PASSWORD)
reducer.validate    = action(VALIDATE)

module.exports = reducer
