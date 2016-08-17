const compose = require('ramda/src/compose')
const j2c     = require('j2c')
const K       = require('ramda/src/always')

const { h }  = require('../lib/redux')
const IO     = require('../lib/io')
const random = require('../ducks/random')

const roll = IO(Math.random).map(x => Math.ceil(x * 6))

module.exports = ({ random: state }) =>
  h('div', { attrs: { class: css.root } }, [
    h('style', css.toString()),

    h('h1', { attrs: { class: css.face } }, state.face),

    h('button', {
      attrs: { class: css.btn },
      on: { click: compose(random.setFace, IO.runIO, K(roll)) }
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
