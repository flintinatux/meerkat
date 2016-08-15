const compose = require('ramda/src/compose')
const idgen   = require('idgen')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const prop    = require('ramda/src/prop')
const trim    = require('ramda/src/trim')

const { action, combine, h, handle } = require('../lib/redux')
const { list, mapList } = require('../lib/list')
const { preventDefault, targetVal }  = require('../lib/util')

const socket = new WebSocket('ws://echo.websocket.org')

const body = handle('', {
  Body: (_, body) => body
})

const messages = list('Message')

exports.reducer = combine({ body, messages })

const listen = dispatch =>
  socket.onmessage = compose(dispatch, action('InsertMessage'), JSON.parse, prop('data'))

const send = body => socket.send(JSON.stringify({ id: idgen(), body }))

exports.view = state =>
  h('div', { attrs: { class: css.root } }, [
    h('style', css.toString()),

    h('div', {
      attrs: { class: css.messages },
      redux: { create: listen }
    }, mapList(state.messages, msg =>
      h('div', { attrs: { class: css.message } }, msg.body)
    )),

    h('form', {
      attrs: { class: css.form },
      on: {
        submit: compose(K(action('Body', '')), send, K(state.body), preventDefault)
      }
    }, [
      h('input', {
        attrs: { class: css.body },
        on: { input: compose(action('Body'), trim, targetVal) },
        props: { value: state.body }
      }),
      h('button', {
        attrs: {
          class: css.btn,
          disabled: !state.body
        }
      }, 'Send')
    ])
  ])

const spacing = '2rem'

const css = j2c.sheet({
  '.body': {
    border: '0.1rem solid #ccc',
    borderRadius: '0.2rem 0 0 0.2rem',
    borderRight: 'none',
    flexGrow: 2,
    outline: 'none',
    padding: '0.8rem 1.2rem'
  },

  '.btn': {
    background: '#fff',
    border: '0.1rem solid #ccc',
    borderRadius: '0 0.2rem 0.2rem 0',
    cursor: 'pointer',
    outline: 'none',
    flexShrink: 0,
    padding: '0.8rem 1.2rem'
  },

  '.form': {
    display: 'flex'
  },

  '.message': {
    paddingBottom: '1rem'
  },

  '.root': {
    maxWidth: '50rem',
    padding: spacing
  }
})
