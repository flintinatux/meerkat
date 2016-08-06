const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const m       = require('mithril')
const map     = require('ramda/src/map')
const Type    = require('union-type')

const component = require('../lib/component')
const IO = require('../lib/io')

const init = K({
  face: 1
})

const Msg = Type({
  Roll: [ IO.is ]
})

const update = Msg.caseOn({
  Roll: (roll, model) => assoc('face', roll.run(), model)
})

const roll = IO(_ => Math.ceil(Math.random() * 6))

const view = (model, update) =>
  m('div', { className: css.root }, [
    m('style', css.toString()),

    m('h1', { className: css.face }, model.face),

    m('button', {
      className: css.btn,
      onclick: compose(update, Msg.Roll, K(roll))
    }, 'Roll')
  ])

module.exports = component({ init, update, view })

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
