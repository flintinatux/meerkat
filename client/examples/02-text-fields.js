const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const flip    = require('ramda/src/flip')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const m       = require('mithril')
const reverse = require('ramda/src/reverse')

const { createAll, handle } = require('../lib/actions')
const redux = require('../lib/redux')
const { targetVal } = require('../lib/util')

const initial = { content: '' }

const Action = createAll([
  'Change',
  'Reset'
])

const reducer = handle(initial, {
  Change: flip(assoc('content')),
  Reset:  assoc('content', '')
})

const view = (model, dispatch) =>
  m('div', { className: css.root }, [
    m('style', css.toString()),

    m('button', {
      className: css.btn,
      onclick: compose(dispatch, K(Action.Reset()))
    }, 'Reset'),

    m('input', {
      className: css.input,
      autofocus: true,
      oninput: compose(dispatch, Action.Change, targetVal),
      placeholder: 'Text to reverse',
      value: model.content
    }),

    m('span', { className: css.arrow }, '<=>'),

    m('input', {
      className: [css.input, css.reverse].join(' '),
      disabled: true,
      placeholder: 'Reversed result',
      value: reverse(model.content)
    })
  ])

module.exports = redux({ reducer, view })

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
