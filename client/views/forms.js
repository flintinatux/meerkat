const compose = require('ramda/src/compose')

const forms = require('../ducks/forms')
const { h } = require('../lib/redux')
const { preventDefault, targetVal } = require('../lib/util')

module.exports = ({ forms: state }) =>
  h('form.forms', {
    on: { submit: compose(forms.validate, preventDefault) }
  }, [
    h('input.input', {
      attrs: {
        placeholder: 'Name',
        type: 'text'
      },
      on: { input: compose(forms.setName, targetVal) }
    }),

    h('input.input', {
      attrs: {
        placeholder: 'Age',
        type: 'number'
      },
      on: { input: compose(forms.setAge, parseInt, targetVal) }
    }),

    h('input.input', {
      attrs: {
        placeholder: 'Password',
        type: 'password'
      },
      on: { input: compose(forms.setPassword, targetVal) }
    }),

    h('input.input', {
      attrs: {
        placeholder: 'Confirm password',
        type: 'password'
      },
      on: { input: compose(forms.setConfirm, targetVal) }
    }),

    h('button.btn.submit', {
      attrs: { type: 'submit' }
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
