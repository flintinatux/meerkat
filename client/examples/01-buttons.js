const dec = require('ramda/src/dec')
const inc = require('ramda/src/inc')
const j2c = require('j2c')
const K   = require('ramda/src/always')

const { action, h, handle } = require('../lib/redux')

exports.reducer = handle(0, {
  Dec:   dec,
  Inc:   inc,
  Reset: K(0)
})

exports.view = state =>
  h('div', { attrs: { class: css.root } }, [
    h('style', css.toString()),

    h('button', {
      attrs: { class: css.btn },
      on: { click: action('Reset') }
    }, 'Reset'),

    h('button', {
      attrs: { class: css.btn },
      on: { click: action('Dec') }
    }, '-'),

    h('input', {
      attrs: {
        class: css.input,
        disabled: true,
      },
      props: { value: state }
    }),

    h('button', {
      attrs: { class: css.btn },
      on: { click: action('Inc') }
    }, '+'),
  ])

const css = j2c.sheet({
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

  '.root': {
    display: 'flex',
    padding: '1rem'
  },

  '.input': {
    border: '1px solid #ccc',
    borderRadius: '0.2rem',
    marginRight: '1rem',
    outline: 'none',
    padding: '0.8rem 1.2rem',
    textAlign: 'center',
    width: '5rem'
  }
})
