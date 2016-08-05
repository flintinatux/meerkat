const compose = require('ramda/src/compose')
const dec  = require('ramda/src/dec')
const inc  = require('ramda/src/inc')
const j2c  = require('j2c')
const K    = require('ramda/src/always')
const m    = require('mithril')
const Type = require('union-type')

const component  = require('../lib/component')

const init = K(0)

const Cmd = Type({
  Dec:   [],
  Inc:   [],
  Reset: []
})

const update = Cmd.caseOn({
  Dec:   dec,
  Inc:   inc,
  Reset: K(0)
})

const view = (model, update) =>
  m('div', { className: css.root }, [
    m('style', css.toString()),

    m('button', {
      className: css.btn,
      onclick: compose(update, K(Cmd.Reset()))
    }, 'Reset'),

    m('button', {
      className: css.btn,
      onclick: compose(update, K(Cmd.Dec()))
    }, '-'),

    m('input', {
      className: css.input,
      disabled: true,
      value: model
    }),

    m('button', {
      className: css.btn,
      onclick: compose(update, K(Cmd.Inc()))
    }, '+'),
  ])

module.exports = component({ init, update, view })

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
