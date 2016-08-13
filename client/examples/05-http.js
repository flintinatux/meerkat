const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const flip    = require('ramda/src/flip')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const path    = require('ramda/src/path')

const { action, h, handle } = require('../lib/redux')
const request = require('../lib/request')

const giphyUri = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='

const initial = {
  topic: 'cats',
  gif:   'https://goo.gl/RYb70Z'
}

const gif = topic =>
  request({ method: 'GET', url: giphyUri + topic, json: true })
    .map(path(['data', 'image_url']))

exports.reducer = handle(initial, {
  Gif: flip(assoc('gif'))
})

exports.view = state =>
  h('div', { attrs: { class: css.root } }, [
    h('style', css.toString()),

    h('h2', { attrs: { class: css.topic } }, state.topic),

    h('img', {
      attrs: {
        class: css.image,
        src: state.gif
      }
    }),

    h('button', {
      attrs: { class: css.btn },
      on: { click: compose(action('Gif'), gif, K(state.topic)) }
    }, 'More please!')
  ])

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
