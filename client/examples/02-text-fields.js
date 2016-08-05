const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const flip    = require('ramda/src/flip')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const m       = require('mithril')
const reverse = require('ramda/src/reverse')
const Type    = require('union-type')

const component = require('../lib/component')
const { scan, targetVal } = require('../lib/util')

const init = K({
  content: ''
})

const Cmd = Type({
  Change: [String]
})

const update = Cmd.caseOn({
  Change: assoc('content')
})

const view = vnode => {
  const cmds  = m.prop(),
        model = scan(flip(update), init(), cmds)

  return vnode =>
    m('div', { className: css.root }, [
      m('style', css.toString()),

      m('input', {
        className: css.input,
        autofocus: true,
        oninput: compose(cmds, Cmd.Change, targetVal),
        placeholder: 'Text to reverse'
      }),

      m('span', { className: css.arrow }, '<=>'),

      m('input', {
        className: css.input,
        disabled: true,
        placeholder: 'Reversed result',
        value: reverse(model().content)
      })
    ])
}

module.exports = component(view)

const spacing = '2rem'

const css = j2c.sheet({
  '.arrow': {
    marginRight: spacing,
  },

  '.input': {
    border: '1px solid #ccc',
    borderRadius: '0.2rem',
    marginRight: spacing,
    outline: 'none',
    padding: '0.8rem 1.2rem',
    width: '20rem'
  },

  '.root': {
    alignItems: 'center',
    display: 'flex',
    padding: spacing
  }
})
