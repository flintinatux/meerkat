const compose = require('ramda/src/compose')
const debug   = require('debug')
const flyd    = require('flyd')
const path    = require('ramda/src/path')
const tap     = require('ramda/src/tap')

const stringify = x =>
  typeof x === 'function' ? `[function ${x.name}]` : JSON.stringify(x)

exports.debug = label => tap(compose(debug(label), stringify))

exports.error = tap(console.error.bind(console))

exports.log = tap(console.log.bind(console))

exports.preventDefault = e => e.preventDefault()

exports.scan = function(fn, acc, s) {
  const ns = flyd.combine(s => acc = fn(acc, s()), [s])
  ns(ns() || acc)
  return ns
}

exports.targetVal = path(['target', 'value'])

exports.listToArray = list => list.ids.map(id => list.byId[id])
