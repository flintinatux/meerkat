const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const flip    = require('ramda/src/flip')
const K       = require('ramda/src/always')
const objOf   = require('ramda/src/objOf')
const prop    = require('ramda/src/prop')

const { action, h, handle } = require('../lib/redux')

const init = compose(objOf('time'), Date.now)

exports.reducer = handle(init, {
  Time: flip(assoc('time'))
})

const angle = time  => 2 * Math.PI * (time % 60000) / 60000
const handX = angle => 50 + 40 * Math.cos(angle)
const handY = angle => 50 + 40 * Math.sin(angle)

const startTicking = dispatch =>
  setInterval(compose(dispatch, action('Time'), Date.now), 1000)

exports.view = state =>
  h('svg', {
    attrs: {
      viewBox: '0 0 100 100',
      width: '300px'
    },
    redux: { create: K(startTicking) }
  }, [
    h('circle', { attrs: { cx: '50', cy: '50', r: '45', fill: '#ddd' } }),

    h('line', {
      attrs: {
        x1: '50',
        y1: '50',
        x2: handX(angle(state.time)),
        y2: handY(angle(state.time)),
        stroke: '#023963'
      }
    })
  ])
