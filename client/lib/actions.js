function Action() {}

exports.create = type => payload =>
  Object.assign(Object.create(Action.prototype), { type, payload })

exports.handle = (initial, reduceMap={}) =>
  (state=initial, { type, payload }) =>
    reduceMap[type] ? reduceMap[type](state, payload) : state
