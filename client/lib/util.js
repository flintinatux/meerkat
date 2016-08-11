const compose = require('ramda/src/compose')
const curry   = require('ramda/src/curry')
const debug   = require('debug')
const flyd    = require('flyd')
const path    = require('ramda/src/path')
const tap     = require('ramda/src/tap')

exports.debug = label => compose(debug(label), JSON.stringify)

exports.error = tap(console.error.bind(console))

exports.log = tap(console.log.bind(console))

exports.preventDefault = e => e.preventDefault()

exports.request = opts =>
  Task((rej, res) => m.request(opts).map(res).catch(rej))

exports.scan = function(fn, acc, s) {
  const ns = flyd.combine(s => acc = fn(acc, s()), [s])
  ns(ns() || acc)
  return ns
}

exports.targetVal = path(['target', 'value'])

const Task = require('./task')
