const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const flip    = require('ramda/src/flip')
const j2c     = require('j2c')
const K       = require('ramda/src/always')

const { action, h, handle } = require('../lib/redux')
const { preventDefault, targetVal } = require('../lib/util')

const init = K({
  age:      0,
  confirm:  '',
  name:     '',
  password: '',
  validate: false
})

exports.reducer = handle(init, {
  Age:      flip(assoc('age')),
  Confirm:  flip(assoc('confirm')),
  Name:     flip(assoc('name')),
  Password: flip(assoc('password')),
  Validate: assoc('validate', true)
})

exports.view = state =>
  h('form', {
    attrs: { class: css.root },
    on: { submit: compose(action('Validate'), preventDefault) }
  }, [
    h('style', css.toString()),

    h('input', {
      attrs: {
        class: css.input,
        placeholder: 'Name',
        type: 'text'
      },
      on: { input: compose(action('Name'), targetVal) }
    }),

    h('input', {
      attrs: {
        class: css.input,
        placeholder: 'Age',
        type: 'number'
      },
      on: { input: compose(action('Age'), parseInt, targetVal) }
    }),

    h('input', {
      attrs: {
        class: css.input,
        placeholder: 'Password',
        type: 'password'
      },
      on: { input: compose(action('Password'), targetVal) }
    }),

    h('input', {
      attrs: {
        class: css.input,
        placeholder: 'Confirm password',
        type: 'password'
      },
      on: { input: compose(action('Confirm'), targetVal) }
    }),

    h('button', {
      attrs: {
        class: css.btn,
        type: 'submit'
      }
    }, 'Submit'),

    state.validate ? validation(state) : ''
  ])

const validation = state => {
  const errors = [],
        { password, confirm } = state

  if (password !== confirm) errors.push('Passwords do not match')
  if (password.length < 8)  errors.push('Password length must be >= 8 chars')

  if (!/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password))
    errors.push('Password must include uppercase, lowecase, and numeric chars')

  return h('div', {
    style: { color: !errors.length ? 'green' : 'red' }
  }, !errors.length ? 'OK' : errors.map(error => h('div', error)))
}

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
