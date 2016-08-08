const curry = require('ramda/src/curry')
const m     = require('mithril')
const tap   = require('ramda/src/tap')

exports.error = tap(console.error.bind(console))

exports.log = tap(console.log.bind(console))

exports.preventDefault = e => e.preventDefault()

exports.request = opts =>
  Task((rej, res) => m.request(opts).map(res).catch(rej))

exports.scan = function(fn, acc, s) {
  const ns = m.prop.combine(s => acc = fn(acc, s()), [s])
  ns(ns() || acc)
  return ns
}

exports.targetVal = e => e.target.value

exports.typeEq = curry((prop, type, x) => typeof x[prop] === type)

const Task = require('./task')
