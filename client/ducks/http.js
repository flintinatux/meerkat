const assoc  = require('ramda/src/assoc')
const concat = require('ramda/src/concat')
const flip   = require('ramda/src/flip')

const { action, handle } = require('../lib/redux')

const prefix = concat('meerkat/http/')

const GIF     = prefix('GIF')
const LOADING = prefix('LOADING')
const TOPIC   = prefix('TOPIC')

const init = {
  gif:     'https://goo.gl/RYb70Z',
  loading: true,
  topic:   'cats'
}

const reducer = handle(init, {
  [ GIF ]:     flip(assoc('gif')),
  [ LOADING ]: flip(assoc('loading')),
  [ TOPIC ]:   flip(assoc('topic'))
})

reducer.gif     = action(GIF)
reducer.loading = action(LOADING)
reducer.topic   = action(TOPIC)

module.exports = reducer
