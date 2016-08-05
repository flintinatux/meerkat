const m = require('mithril')

const stated = hook => vnode => vnode.state[hook](vnode)

const oninit = Comp => vnode => {
  vnode.state.oncreate = m.prop()
  vnode.state.onremove = m.prop()
  vnode.state.view = Comp(vnode)
}

const onbeforeupdate = (vnode, old) => old.instance !== vnode.state.view()

const oncreate = stated('oncreate')
const onremove = stated('onremove')
const view     = stated('view')

module.exports = function(Comp) {
  return { oninit: oninit(Comp), oncreate, onbeforeupdate, onremove, view }
}
