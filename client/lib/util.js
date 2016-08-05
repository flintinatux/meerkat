const m = require('mithril')

exports.scan = function(fn, acc, s) {
  const ns = m.prop.combine(s => acc = fn(acc, s()), [s])
  ns(ns() || acc)
  return ns
}

exports.targetVal = e => e.target.value
