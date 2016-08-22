const compose = require('ramda/src/compose')
const K       = require('ramda/src/always')
const prop    = require('ramda/src/prop')
const trim    = require('ramda/src/trim')

const { h } = require('../lib/redux')
const idgen = require('../lib/idgen')
const { listToArray } = require('../lib/util')
const { preventDefault, targetVal }  = require('../lib/util')
const { body, insertMessage, reset } = require('../ducks/sockets')

const socket = new WebSocket('ws://echo.websocket.org')

const connect = dispatch =>
  socket.onmessage = compose(dispatch, insertMessage, JSON.parse, prop('data'))

const disconnect = _ => socket.onmessage = null

const send = body => socket.send(JSON.stringify({ id: idgen(), body }))

module.exports = ({ sockets }) =>
  h('div.sockets', [
    h('div.messages', {
      redux: { create: connect, destroy: disconnect }
    }, listToArray(sockets.messages).map(msg =>
      h('div.message', msg.body)
    )),

    h('form.form', {
      on: {
        submit: compose(reset, send, K(sockets.body), preventDefault)
      }
    }, [
      h('input.input.body', {
        on: { input: compose(body, trim, targetVal) },
        props: { value: sockets.body }
      }),
      h('button.btn.send', {
        attrs: { disabled: !sockets.body }
      }, 'Send')
    ])
  ])
