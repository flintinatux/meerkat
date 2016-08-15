const attrs    = require('snabbdom/modules/attributes')
const classes  = require('snabbdom/modules/class')
const compose  = require('ramda/src/compose')
const curry    = require('ramda/src/curry')
const flyd     = require('flyd')
const I        = require('ramda/src/identity')
const { init } = require('snabbdom')
const mapObj   = require('ramda/src/mapObjIndexed')
const props    = require('snabbdom/modules/props')
const style    = require('snabbdom/modules/style')

const { debug, error } = require('./util')
const events = require('./events')
const hooks  = require('./hooks')

const action = exports.action = curry((type, payload) => ({ type, payload }))

exports.combine = reducers => (state={}, action) =>
  mapObj((reducer, key) => reducer(state[key], action), reducers)

exports.h = require('snabbdom/h')

exports.handle = (init, reducers) =>
  (state=init, { type, payload }) =>
    reducers[type] ? reducers[type](state, payload) : state

exports.mount = (root, { reducer=I, view }) => {
  const dispatch = flyd.stream()
  const state = flyd.combine(reduceWith(reducer), [dispatch])
  state(reducer(undefined, {}))
  dispatch.map(debug('dispatch'))
  state.map(debug('state'))
  flyd.scan(patch(dispatch), root, state.map(view))

  return function teardown() {
    patch(dispatch)(root, '')
    dispatch.end(true)
  }
}

const patch = dispatch =>
  init([ attrs, classes, events(dispatch), props, style, hooks(dispatch) ])

const reduceWith = reducer => (dispatch, state) => {
  if (typeof dispatch() === 'function') {
    dispatch()(dispatch, state)
    return undefined
  }

  const { type, payload } = dispatch()

  if (typeof payload.fork === 'function') {
    payload.map(action(type)).fork(error, dispatch)
  } else if (typeof payload.then === 'function') {
    payload.then(action(type)).then(dispatch).catch(error)
  } else {
    return reducer(state(), dispatch())
  }
}
