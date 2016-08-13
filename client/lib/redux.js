const attrs    = require('snabbdom/modules/attributes')
const compose  = require('ramda/src/compose')
const flyd     = require('flyd')
const { init } = require('snabbdom')
const props    = require('snabbdom/modules/props')
const style    = require('snabbdom/modules/style')

const { debug, error } = require('./util')
const events = require('./events')

const patch = dispatch => init([ attrs, events(dispatch), props, style ])

const reduceWithAsync = reducer => (dispatch, state) => {
  const { type, payload } = dispatch()
  if (typeof payload.fork === 'function') {
    payload.map(action(type)).fork(error, dispatch)
  } else if (typeof payload.then === 'function') {
    payload.then(action(type)).then(dispatch).catch(error)
  } else {
    return reducer(state(), dispatch())
  }
}

const action = exports.action = type => payload => ({ type, payload })

exports.h = require('snabbdom/h')

exports.handle = (initial, reducers) =>
  (state=initial, { type, payload }) =>
    reducers[type] ? reducers[type](state, payload) : state

exports.mount = (root, { reducer, view }) => {
  const dispatch = flyd.stream()
  const state = flyd.combine(reduceWithAsync(reducer), [dispatch])
  dispatch.map(debug('dispatch'))
  state.map(debug('state'))
  state(reducer(undefined, {}))
  flyd.scan(patch(dispatch), root, state.map(view))

  return function teardown() {
    patch(dispatch)(root, '')
    dispatch.end(true)
  }
}
