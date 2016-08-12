const attrs    = require('snabbdom/modules/attributes')
const flyd     = require('flyd')
const { init } = require('snabbdom')
const props    = require('snabbdom/modules/props')
const style    = require('snabbdom/modules/style')

const { debug, error } = require('./util')
const events = require('./events')
const Task   = require('./task')

const patch = dispatch => init([ attrs, events(dispatch), props, style ])

exports.action = type => payload => ({ type, payload })

exports.h = require('snabbdom/h')

exports.handle = (initial, reducers) => {
  if (reducers === undefined) [reducers, initial] = [initial, null]
  return (state=initial, { type, payload }, getState) =>
    reducers[type] ? reducers[type](state, payload, getState) : state
}

exports.mount = (root, { reducer, view }) => {
  const dispatch = flyd.stream(),
        action   = dispatch.map(debug('dispatch'))

  const state = flyd.combine((action, self) => {
    const { type, payload } = action()
    if (!Task.is(payload)) return reducer(self(), action())
    payload.map(exports.action(type)).fork(error, dispatch)
  }, [action])

  state.map(debug('state'))
  state(reducer(undefined, {}))

  const vnode = state.map(view),
        app   = flyd.scan(patch(dispatch), root, vnode)

  return function teardown() {
    patch(dispatch)(root, '')
    dispatch.end(true)
  }
}
