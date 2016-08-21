const compose = require('ramda/src/compose')

const { h }    = require('../lib/redux')
const { tick } = require('../ducks/time')

const angle = time  => 2 * Math.PI * (time % 60000) / 60000
const handX = angle => 50 + 40 * Math.cos(angle)
const handY = angle => 50 + 40 * Math.sin(angle)

const startTicking = dispatch => {
  const updateTime = compose(dispatch, tick, Date.now)
  updateTime()
  setInterval(updateTime, 1000)
}

module.exports = ({ time: { time } }) =>
  h('svg', {
    attrs: {
      viewBox: '0 0 100 100',
      width: '300px'
    },
    redux: { create: startTicking }
  }, [
    h('circle', { attrs: { cx: '50', cy: '50', r: '45', fill: '#ddd' } }),

    h('line', {
      attrs: {
        x1: '50',
        y1: '50',
        x2: handX(angle(time)),
        y2: handY(angle(time)),
        stroke: '#023963'
      }
    })
  ])
