const invoke = ({ data: { redux } }, hook, dispatch) =>
  redux && typeof redux[hook] === 'function' && dispatch(redux[hook]())

module.exports = dispatch => ({
  create:  (_, vnode) => invoke(vnode, 'create', dispatch),
  update:  (_, vnode) => invoke(vnode, 'update', dispatch),
  destroy: vnode => invoke(vnode, 'destroy', dispatch)
})
