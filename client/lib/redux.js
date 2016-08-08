const compose = require('ramda/src/compose')
const debug = require('debug')
const I = require('ramda/src/identity')
const m = require('mithril')

const { log, scan } = require('../lib/util')

const oninit = reducer => vnode => {
  const dispatch = m.prop(),
        model = scan(reducer, reducer(undefined, {}), dispatch)

  dispatch.map(compose(debug('dispatch'), JSON.stringify))
  model.map(compose(debug('model'), JSON.stringify))

  vnode.state = { dispatch, model }
}

const stateless = view =>
  ({ state: { dispatch, model } }) => view(model(), dispatch)

module.exports = ({ reducer=I, view }) => ({
  oninit: oninit(reducer),
  view:   stateless(view)
})
