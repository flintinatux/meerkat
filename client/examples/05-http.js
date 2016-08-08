const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const flip    = require('ramda/src/flip')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const m       = require('mithril')
const prop    = require('ramda/src/prop')

const { createAll, handle } = require('../lib/actions')
const { error, log, request } = require('../lib/util')
const redux = require('../lib/redux')

const giphyUri = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='

const initial = {
  topic: 'cats',
  gif:   'https://goo.gl/RYb70Z'
}

const Action = createAll([
  'Gif',
  'More'
])

const reducer = handle(initial, {
  Gif: flip(assoc('gif'))
})

const async = handle({
  More: (dispatch, topic) =>
    request({ method: 'GET', url: giphyUri + topic })
      .map(compose(Action.Gif, prop('image_url'), prop('data')))
      .fork(error, dispatch)
})

const view = (model, dispatch) =>
  m('div', { className: css.root }, [
    m('style', css.toString()),

    m('h2', { className: css.topic }, model.topic),

    m('img', {
      className: css.image,
      src: model.gif
    }),

    m('button', {
      className: css.btn,
      onclick: compose(dispatch, Action.More, K(model.topic))
    }, 'More please!')
  ])

module.exports = redux({ async, reducer, view })

const spacing = '1rem'

const css = j2c.sheet({
  '.btn': {
    background: '#fff',
    border: '0.1rem solid #ccc',
    borderRadius: '0.2rem',
    cursor: 'pointer',
    display: 'block',
    marginBottom: spacing,
    outline: 'none',
    padding: '0.8rem 1.2rem',
    width: '15rem',

    '&:active': {
      background: '#eee'
    }
  },

  '.image': {
    display: 'block',
    marginBottom: spacing
  },

  '.root': {
    margin: '2rem'
  },

  '.topic': {
    margin: `0 0 ${spacing}`,
    textTransform: 'capitalize'
  }
})
