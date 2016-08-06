const curry = require('ramda/src/curry')
const m     = require('mithril')

exports.scan = function(fn, acc, s) {
  const ns = m.prop.combine(s => acc = fn(acc, s()), [s])
  ns(ns() || acc)
  return ns
}

exports.preventDefault = e => e.preventDefault()

exports.targetVal = e => e.target.value

exports.typeEq = curry((prop, type, x) => typeof x[prop] === type)
