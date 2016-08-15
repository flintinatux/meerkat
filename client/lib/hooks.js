const invoke = ({ data: { redux } }, hook, dispatch) =>
  redux && redux[hook] && dispatch(redux[hook])

module.exports = dispatch => ({
  create:  (_, vnode) => invoke(vnode, 'create', dispatch),
  update:  (_, vnode) => invoke(vnode, 'update', dispatch),
  destroy: vnode => invoke(vnode, 'destroy', dispatch)
})