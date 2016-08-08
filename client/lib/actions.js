const assoc  = require('ramda/src/assoc')
const reduce = require('ramda/src/reduce')

function Action(){}

exports.create = type => payload =>
  Object.assign(Object.create(Action.prototype), { type, payload })

exports.createAll = types => reduce((Action, type) =>
  assoc(type, exports.create(type), Action)
, {}, types)

exports.handle = (initial, reduceMap={}) =>
  (state=initial, { type, payload }) =>
    reduceMap[type] ? reduceMap[type](state, payload) : state
