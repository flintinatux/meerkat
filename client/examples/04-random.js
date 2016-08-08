const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const flip    = require('ramda/src/flip')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const m       = require('mithril')

const { createAll, handle } = require('../lib/actions')
const IO = require('../lib/io')
const redux = require('../lib/redux')

const initial = { face: 1 }

const Action = createAll([
  'Face',
  'Roll'
])

const reducer = handle(initial, {
  Face: flip(assoc('face'))
})

const async = handle({
  Roll: dispatch =>
    IO(Math.random).map(compose(dispatch, Action.Face, roll)).runIO()
})

const roll = random => Math.ceil(random * 6)

const view = (model, dispatch) =>
  m('div', { className: css.root }, [
    m('style', css.toString()),

    m('h1', { className: css.face }, model.face),

    m('button', {
      className: css.btn,
      onclick: compose(dispatch, K(Action.Roll())),
    }, 'Roll')
  ])

module.exports = redux({ async, reducer, view })

const spacing = '1rem'

const css = j2c.sheet({
  '.btn': {
    background: '#fff',
    border: '0.1rem solid #ccc',
    borderRadius: '0.2rem',
    cursor: 'pointer',
    marginBottom: spacing,
    outline: 'none',
    padding: '0.8rem 1.2rem',

    '&:active': {
      background: '#eee'
    }
  },

  '.face': {
    margin: '0',
    padding: spacing,
    textAlign: 'center'
  },

  '.root': {
    display: 'flex',
    flexDirection: 'column',
    margin: '2rem',
    width: '5rem'
  }
})
