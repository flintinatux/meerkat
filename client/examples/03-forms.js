const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const m       = require('mithril')
const Type    = require('union-type')

const component = require('../lib/component')
const { preventDefault, targetVal } = require('../lib/util')

const init = K({
  age:       0,
  confirm:  '',
  name:     '',
  password: '',
  validate: false
})

const Msg = Type({
  Age:      [Number],
  Confirm:  [String],
  Name:     [String],
  Password: [String],
  Validate: []
})

const update = Msg.caseOn({
  Age:      assoc('age'),
  Confirm:  assoc('confirm'),
  Name:     assoc('name'),
  Password: assoc('password'),
  Validate: assoc('validate', true)
})

const view = (model, update) =>
  m('form', {
    className: css.root,
    onsubmit: compose(update, K(Msg.Validate()), preventDefault)
  }, [
    m('style', css.toString()),

    m('input', {
      className: css.input,
      oninput: compose(update, Msg.Name, targetVal),
      placeholder: 'Name',
      type: 'text'
    }),

    m('input', {
      className: css.input,
      oninput: compose(update, Msg.Age, parseInt, targetVal),
      placeholder: 'Age',
      type: 'number'
    }),

    m('input', {
      className: css.input,
      oninput: compose(update, Msg.Password, targetVal),
      placeholder: 'Password',
      type: 'password'
    }),

    m('input', {
      className: css.input,
      oninput: compose(update, Msg.Confirm, targetVal),
      placeholder: 'Confirm password',
      type: 'password'
    }),

    m('button', {
      className: css.btn,
      type: 'submit'
    }, 'Submit'),

    model.validate ? validation(model) : ''
  ])

const validation = model => {
  const errors = [],
        { password, confirm } = model

  if (password !== confirm) errors.push('Passwords do not match')
  if (password.length < 8)  errors.push('Password length must be >= 8 chars')

  if (!/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password))
    errors.push('Password must include uppercase, lowecase, and numeric chars')

  return m('div', {
    style: {
      color: !errors.length ? 'green' : 'red'
    }
  }, !errors.length ? 'OK' : errors.map(error => m('div', error)))
}

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
    width: '10rem',

    '&:active': {
      background: '#eee'
    }
  },

  '.input': {
    border: '0.1rem solid #ccc',
    borderRadius: '0.2rem',
    marginBottom: spacing,
    outline: 'none',
    padding: '0.8rem 1.2rem',
    width: '20rem'
  },

  '.root': {
    alignItems: 'left',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem'
  }
})
