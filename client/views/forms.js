const compose = require('ramda/src/compose')

const { setAge, setConfirm, setName,
        setPassword, validate } = require('../ducks/forms')

const { h } = require('../lib/redux')
const { preventDefault, targetVal } = require('../lib/util')

module.exports = ({ forms }) =>
  h('form.forms', {
    on: { submit: compose(validate, preventDefault) }
  }, [
    h('input.input', {
      attrs: {
        placeholder: 'Name',
        type: 'text'
      },
      on: { input: compose(setName, targetVal) },
      props: { value: forms.name }
    }),

    h('input.input', {
      attrs: {
        placeholder: 'Age',
        type: 'number'
      },
      on: { input: compose(setAge, parseInt, targetVal) },
      props: { value: forms.age }
    }),

    h('input.input', {
      attrs: {
        placeholder: 'Password',
        type: 'password'
      },
      on: { input: compose(setPassword, targetVal) },
      props: { value: forms.password }
    }),

    h('input.input', {
      attrs: {
        placeholder: 'Confirm password',
        type: 'password'
      },
      on: { input: compose(setConfirm, targetVal) },
      props: { value: forms.confirm }
    }),

    h('button.btn.submit', {
      attrs: { type: 'submit' }
    }, 'Submit'),

    forms.validate ? validation(forms) : ''
  ])

const validation = forms => {
  const errors = [],
        { password, confirm } = forms

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
