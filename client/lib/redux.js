const attrs    = require('snabbdom/modules/attributes')
const flyd     = require('flyd')
const props    = require('snabbdom/modules/props')
const snabbdom = require('snabbdom')
const style    = require('snabbdom/modules/style')

const { debug } = require('../lib/util')
const events    = require('../lib/events')

const patcher = dispatch =>
  snabbdom.init([ attrs, events(dispatch), props, style ])

exports.action = type => payload => ({ type, payload })

exports.h = require('snabbdom/h')

exports.handle = (initial, reducers={}) =>
  (state=initial, { type, payload }) =>
    reducers[type] ? reducers[type](state, payload) : state

exports.mount = (root, { reducer, view }) => {
  const dispatch = flyd.stream(),
        patch    = patcher(dispatch),
        state    = flyd.scan(reducer, reducer(undefined, {}), dispatch),
        vnode    = state.map(view),
        app      = flyd.scan(patch, root, vnode)

  dispatch.map(debug('dispatch'))
  state.map(debug('state'))

  return function teardown() {
    patch(root, '')
    dispatch.end(true)
  }
}
