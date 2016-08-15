const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const flip    = require('ramda/src/flip')
const j2c     = require('j2c')
const reverse = require('ramda/src/reverse')

const { action, h, handle } = require('../lib/redux')
const { targetVal } = require('../lib/util')

const init = { content: '' }

exports.reducer = handle(init, {
  Change: flip(assoc('content')),
  Reset:  assoc('content', '')
})

exports.view = state =>
  h('div', { attrs: { class: css.root } }, [
    h('style', css.toString()),

    h('button', {
      attrs: { class: css.btn },
      on: { click: action('Reset') }
    }, 'Reset'),

    h('input', {
      attrs: {
        class: css.input,
        autofocus: true,
        placeholder: 'Text to reverse'
      },
      on: { input: compose(action('Change'), targetVal) },
      props: { value: state.content }
    }),

    h('span', { attrs: { class: css.arrow } }, '<=>'),

    h('input', {
      attrs: {
        class: [css.input, css.reverse].join(' '),
        disabled: true,
        placeholder: 'Reversed result'
      },
      props: { value: reverse(state.content) }
    })
  ])

const spacing = '2rem'

const css = j2c.sheet({
  '.arrow': {
    marginRight: spacing,
  },

  '.btn': {
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '0.2rem',
    cursor: 'pointer',
    marginRight: '1rem',
    minWidth: '3rem',
    padding: '0.8rem 1.2rem',
    outline: 'none',

    '&:active': {
      background: '#eee'
    }
  },

  '.input': {
    border: '1px solid #ccc',
    borderRadius: '0.2rem',
    marginRight: spacing,
    outline: 'none',
    padding: '0.8rem 1.2rem',
    width: '20rem',

    '&.reverse': {
      textAlign: 'right'
    }
  },

  '.root': {
    alignItems: 'center',
    display: 'flex',
    padding: spacing
  }
})
