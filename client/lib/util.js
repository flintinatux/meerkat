const m = require('mithril')

exports.reduce = function(fn, acc, s) {
  const ns = m.prop.combine(s => acc = fn(acc, s()), [s])
  ns(ns() || acc)
  return ns
}
