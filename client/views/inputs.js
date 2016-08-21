const compose = require('ramda/src/compose')
const reverse = require('ramda/src/reverse')

const { change, reset } = require('../ducks/inputs')
const { h } = require('../lib/redux')
const { targetVal } = require('../lib/util')

module.exports = ({ inputs: { content } }) =>
  h('div.inputs', [
    h('button.btn', {
      on: { click: reset }
    }, 'Reset'),

    h('input.input.content', {
      attrs: {
        autofocus: true,
        placeholder: 'Text to reverse'
      },
      on: { input: compose(change, targetVal) },
      props: { value: content }
    }),

    h('span', '<=>'),

    h('input.input.reverse', {
      attrs: {
        disabled: true,
        placeholder: 'Reversed result'
      },
      props: { value: reverse(content) }
    })
  ])
