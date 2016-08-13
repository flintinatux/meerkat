const curry   = require('ramda/src/curry')
const compose = require('ramda/src/compose')
const debug   = require('debug')
const flyd    = require('flyd')
const path    = require('ramda/src/path')
const tap     = require('ramda/src/tap')

exports.debug = label => tap(compose(debug(label), JSON.stringify))

exports.error = tap(console.error.bind(console))

exports.log = tap(console.log.bind(console))

exports.preventDefault = e => e.preventDefault()

exports.scan = function(fn, acc, s) {
  const ns = flyd.combine(s => acc = fn(acc, s()), [s])
  ns(ns() || acc)
  return ns
}

exports.targetVal = path(['target', 'value'])
