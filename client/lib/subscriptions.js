const invoke = ({ data: { subs } }, hook, dispatch) =>
  subs && typeof subs[hook] === 'function' && subs[hook](dispatch)

module.exports = dispatch => ({
  create:  (_, vnode) => invoke(vnode, 'create', dispatch),
  update:  (_, vnode) => invoke(vnode, 'update', dispatch),
  destroy: vnode => invoke(vnode, 'destroy', dispatch)
})
