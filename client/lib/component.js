const flip = require('ramda/src/flip')
const I    = require('ramda/src/identity')
const m    = require('mithril')

const { scan } = require('../lib/util')

const oninit = (init, update) => vnode => {
  const actions = m.prop(),
        model   = scan(flip(update), init(vnode.attrs), actions)
  vnode.state = { model, update: actions }
}

const stateless = view =>
  ({ state: { update, model } }) => view(model(), update)

module.exports = ({ init=I, update=I, view }) => ({
  oninit: oninit(init, update),
  view:   stateless(view)
})
