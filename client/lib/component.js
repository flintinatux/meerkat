const flip = require('ramda/src/flip')
const m    = require('mithril')

const { scan } = require('../lib/util')

const oninit = (init, update) => vnode => {
  const actions = m.prop(),
        model   = scan(flip(update), init(), actions)
  vnode.state = { model, update: actions }
}

const stateless = view =>
  ({ state: { update, model } }) => view(update, model())

module.exports = ({ init, update, view }) => ({
  oninit: oninit(init, update),
  view:   stateless(view)
})
