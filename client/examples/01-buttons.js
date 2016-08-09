const compose = require('ramda/src/compose')
const dec  = require('ramda/src/dec')
const inc  = require('ramda/src/inc')
const j2c  = require('j2c')
const K    = require('ramda/src/always')
const m    = require('mithril')

const { createAll, handle } = require('../lib/actions')
const redux = require('../lib/redux')

const Action = createAll([
  'Dec',
  'Inc',
  'Reset'
])

const reducer = handle(0, {
  Dec:   dec,
  Inc:   inc,
  Reset: K(0)
})

const view = (dispatch, state) =>
  m('div', { className: css.root }, [
    m('style', css.toString()),

    m('button', {
      className: css.btn,
      onclick: compose(dispatch, K(Action.Reset()))
    }, 'Reset'),

    m('button', {
      className: css.btn,
      onclick: compose(dispatch, K(Action.Dec()))
    }, '-'),

    m('input', {
      className: css.input,
      disabled: true,
      value: state
    }),

    m('button', {
      className: css.btn,
      onclick: compose(dispatch, K(Action.Inc()))
    }, '+'),
  ])

module.exports = redux({ reducer, view })

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
