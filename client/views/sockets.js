const compose = require('ramda/src/compose')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const prop    = require('ramda/src/prop')
const trim    = require('ramda/src/trim')

const { h } = require('../lib/redux')
const idgen = require('../lib/idgen')
const { listToArray } = require('../lib/util')
const { preventDefault, targetVal }  = require('../lib/util')
const sockets = require('../ducks/sockets')

const socket = new WebSocket('ws://echo.websocket.org')

const connect = dispatch =>
  socket.onmessage = compose(dispatch, sockets.insertMessage, JSON.parse, prop('data'))

const disconnect = _ => socket.onmessage = null

const send = body => socket.send(JSON.stringify({ id: idgen(), body }))

module.exports = ({ sockets: state }) =>
  h('div', { attrs: { class: css.root } }, [
    h('style', css.toString()),

    h('div', {
      attrs: { class: css.messages },
      redux: { create: connect, destroy: disconnect }
    }, listToArray(state.messages).map(msg =>
      h('div', { attrs: { class: css.message } }, msg.body)
    )),

    h('form', {
      attrs: { class: css.form },
      on: {
        submit: compose(sockets.reset, send, K(state.body), preventDefault)
      }
    }, [
      h('input', {
        attrs: { class: css.body },
        on: { input: compose(sockets.body, trim, targetVal) },
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