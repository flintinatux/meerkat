const I = require('ramda/src/identity')
const m = require('mithril')

const { debug, scan } = require('../lib/util')

const oninit = (reducer=I, async) => vnode => {
  const dispatch = m.prop(),
        state = scan(reducer, reducer(undefined, {}), dispatch)

  dispatch.map(debug('dispatch'))
  state.map(debug('state'))

  if (async) {
    dispatch.map(action => async(dispatch, action, state))
    state.map(m.redraw)
  }

  vnode.state = { dispatch, state }
}

const pure = view =>
  ({ state: { dispatch, state } }) => view(dispatch, state())

module.exports = ({ async, reducer, view }) => ({
  oninit: oninit(reducer, async),
  view:   pure(view)
})
