const attrs    = require('snabbdom/modules/attributes')
const flyd     = require('flyd')
const { init } = require('snabbdom')
const props    = require('snabbdom/modules/props')
const style    = require('snabbdom/modules/style')

const { debug } = require('../lib/util')
const events    = require('../lib/events')

const patch = dispatch => init([ attrs, events(dispatch), props, style ])

exports.action = type => payload => ({ type, payload })

exports.h = require('snabbdom/h')

exports.handle = (initial, reducers) => {
  if (reducers === undefined) [reducers, initial] = [initial, null]
  return (state=initial, { type, payload }, getState) =>
    reducers[type] ? reducers[type](state, payload, getState) : state
}

exports.mount = (root, { async, reducer, view }) => {
  const dispatch = flyd.stream(),
        actions  = dispatch.map(debug('dispatch')),
        state    = flyd.scan(reducer, reducer(undefined, {}), actions),
        vnode    = state.map(view),
        app      = flyd.scan(patch(dispatch), root, vnode)

  state.map(debug('state'))
  if (async) actions.map(action => async(dispatch, action, state))

  return function teardown() {
    patch(dispatch)(root, '')
    dispatch.end(true)
  }
}
