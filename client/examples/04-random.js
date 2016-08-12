const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const flip    = require('ramda/src/flip')
const j2c     = require('j2c')
const K       = require('ramda/src/always')

const { action, h, handle } = require('../lib/redux')
const IO = require('../lib/io')

const initial = { face: 1 }

const roll = random => Math.ceil(random * 6)

exports.async = handle({
  Roll: dispatch =>
    IO(Math.random).map(compose(dispatch, action('Face'), roll)).runIO()
})

exports.reducer = handle(initial, {
  Face: flip(assoc('face'))
})

exports.view = state =>
  h('div', { attrs: { class: css.root } }, [
    h('style', css.toString()),

    h('h1', { attrs: { class: css.face } }, state.face),

    h('button', {
      attrs: { class: css.btn },
      on: { click: action('Roll') }
    }, 'Roll')
  ])

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
