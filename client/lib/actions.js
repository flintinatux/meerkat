const assoc  = require('ramda/src/assoc')
const reduce = require('ramda/src/reduce')

function Action(){}

exports.create = type => payload =>
  Object.assign(Object.create(Action.prototype), { type, payload })

exports.createAll = types => reduce((Action, type) =>
  assoc(type, exports.create(type), Action)
, {}, types)

exports.handle = (initial, reduceMap) => {
  if (reduceMap === undefined) [reduceMap, initial] = [initial, null]
  return (state=initial, { type, payload }, getState) =>
    reduceMap[type] ? reduceMap[type](state, payload, getState) : state
}
