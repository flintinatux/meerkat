const { h } = require('puddles')

const { dec, inc, reset } = require('../ducks/counter')

module.exports = ({ counter }) =>
  h('div.counter', [
    h('button.btn.action', {
      on: { click: reset }
    }, 'Reset'),

    h('button.btn.action', {
      on: { click: dec }
    }, '-'),

    h('input.input.count', {
      attrs: { disabled: true },
      props: { value: counter }
    }),

    h('button.btn.action', {
      on: { click: inc }
    }, '+'),
  ])
