const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const m       = require('mithril')
const prop    = require('ramda/src/prop')
const Type    = require('union-type')

const component = require('../lib/component')
const { error, log, request } = require('../lib/util')
const Task = require('../lib/task')

const giphyUri = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='

const init = K({
  topic: 'cats',
  gif:   'waiting.gif'
})

const Msg = Type({
  Gif:  [ String ],
  More: [ Task.is ]
})

const randomGif = topic =>
  request({ method: 'GET', url: giphyUri + topic })
    .map(prop('data'))
    .map(prop('image_url'))

const update = Msg.caseOn({
  Gif:  assoc('gif'),
  More: (more, model) => {
    more.fork(error, compose(m.redraw, update, Msg.Gif, log))
    return model
  }
})

const view = (model, update) =>
  m('div', { className: css.root }, [
    m('style', css.toString()),

    m('h2', { className: css.topic }, model.topic),

    m('img', {
      className: css.image,
      src: model.gif
    }),

    m('button', {
      className: css.btn,
      onclick: compose(update, Msg.More, randomGif, K(model.topic))
    }, 'More please!')
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
    width: '15rem',

    '&:active': {
      background: '#eee'
    }
  },

  '.image': {
    marginBottom: spacing
  },

  '.root': {
    display: 'flex',
    flexDirection: 'column',
    margin: '2rem'
  },

  '.topic': {
    margin: `0 0 ${spacing}`,
    textTransform: 'capitalize'
  }
})
