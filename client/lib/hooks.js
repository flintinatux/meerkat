const invoke = ({ data: { dispatch: hooks } }, hook, dispatch) =>
  hooks && typeof hooks[hook] === 'function' && dispatch(hooks[hook]())

module.exports = dispatch => ({
  create:  (_, vnode) => invoke(vnode, 'create', dispatch),
  update:  (_, vnode) => invoke(vnode, 'update', dispatch),
  destroy: vnode => invoke(vnode, 'destroy', dispatch)
})
