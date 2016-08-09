const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const curry   = require('crocks/funcs/curry')
const flip    = require('ramda/src/flip')
const K       = require('ramda/src/always')
const m       = require('mithril')
const prop    = require('ramda/src/prop')

const { createAll, handle } = require('../lib/actions')
const { error, log, request } = require('../lib/util')
const redux = require('../lib/redux')

const action = curry((type, payload) => ({ type, payload }))

const initial = { time: 0 }

const reducer = handle(initial, {
  Tick: flip(assoc('time'))
})

const angle = time  => 2 * Math.PI * (time % 60) / 60
const handX = angle => 50 + 40 * Math.cos(angle)
const handY = angle => 50 + 40 * Math.sin(angle)

const view = (dispatch, { time }) =>
  m('svg', {
    oninit: null,
    onremove: null,
    viewBox: '0 0 100 100',
    width: '300px'
  }, [
    m('circle', { cx: '50', cy: '50', r: '45', fill: '#0B79CE' }),

    m('line', {
      x1: '50',
      y1: '50',
      x2: handX(angle(time)),
      y2: handY(angle(time)),
      stroke: '#023963'
    })
  ])

module.exports = redux({ reducer, view })
