const I = require('ramda/src/identity')
const m = require('mithril/render/hyperscript')
const renderService = require('mithril/render/render')
const stream = require('mithril/util/stream')

const { debug, scan } = require('../lib/util')

module.exports = (root, { async, reducer, view }) => {
  const { render, setEventCallback } = renderService(window)

  const redraw = state => render(root, view(m, state))

  const dispatch = stream(),
        state = scan(reducer, reducer(undefined, {}), dispatch)

  dispatch.map(debug('dispatch'))
  state.map(debug('state'))

  if (async) dispatch.map(action => async(dispatch, action, state))

  setEventCallback(dispatch)
  state.map(redraw)

  return function teardown() {
    render(root, null)
    dispatch.end(true)
  }
}

//   vnode.state = { dispatch, state }
// }

// const pure = view =>
//   ({ state: { dispatch, state } }) => view(dispatch, state())

// module.exports = ({ async, reducer, view }) => ({
//   oninit: oninit(reducer, async),
//   view:   pure(view)
// })
