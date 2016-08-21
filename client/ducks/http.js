const assoc  = require('ramda/src/assoc')
const concat = require('ramda/src/concat')
const flip   = require('ramda/src/flip')

const { action, handle } = require('../lib/redux')

const prefix = concat('meerkat/http/')

const SET_GIF     = prefix('SET_GIF')
const SET_LOADING = prefix('SET_LOADING')
const SET_TOPIC   = prefix('SET_TOPIC')

const init = {
  gif:     'https://goo.gl/RYb70Z',
  loading: true,
  topic:   'cats'
}

const reducer = handle(init, {
  [ SET_GIF ]:     flip(assoc('gif')),
  [ SET_LOADING ]: flip(assoc('loading')),
  [ SET_TOPIC ]:   flip(assoc('topic'))
})

reducer.setGif     = action(SET_GIF)
reducer.setLoading = action(SET_LOADING)
reducer.setTopic   = action(SET_TOPIC)

module.exports = reducer
