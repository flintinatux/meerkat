const counter = require('../ducks/counter')
const { h }   = require('../lib/redux')

module.exports = ({ counter: state }) =>
  h('div.counter', [
    h('button.btn.action', {
      on: { click: counter.reset }
    }, 'Reset'),

    h('button.btn.action', {
      on: { click: counter.dec }
    }, '-'),

    h('input.input.count', {
      attrs: { disabled: true },
      props: { value: state }
    }),

    h('button.btn.action', {
      on: { click: counter.inc }
    }, '+'),
  ])
