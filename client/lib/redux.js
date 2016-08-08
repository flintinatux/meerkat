const I = require('ramda/src/identity')
const m = require('mithril')

const { create, handle } = require('../lib/actions')
const { log, scan }      = require('../lib/util')

const oninit = reducer => vnode => {
  const dispatch = m.prop(),
        model = scan(reducer, reducer(undefined, {}), dispatch)

  dispatch.map(log)
  model.map(log)

  vnode.state = { dispatch, model }
}

const stateless = view =>
  ({ state: { dispatch, model } }) => view(model(), dispatch)

module.exports = ({ reducer=I, view }) => ({
  oninit: oninit(reducer),
  view:   stateless(view)
})
