const compose = require('ramda/src/compose')
const debug   = require('debug')
const I = require('ramda/src/identity')
const m = require('mithril')

const { log, scan } = require('../lib/util')

const oninit = (reducer=I, async) => vnode => {
  const dispatch = m.prop(),
        state = scan(reducer, reducer(undefined, {}), dispatch)

  dispatch.map(compose(debug('dispatch'), JSON.stringify))
  state.map(compose(debug('state'), JSON.stringify))

  if (async) {
    dispatch.map(action => async(dispatch, action, state))
    state.map(m.redraw)
  }

  vnode.state = { dispatch, state }
}

const pure = view =>
  ({ state: { dispatch, state } }) => view(state(), dispatch)

module.exports = ({ async, reducer, view }) => ({
  oninit: oninit(reducer, async),
  view:   pure(view)
})
