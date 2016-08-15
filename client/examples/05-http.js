const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const flip    = require('ramda/src/flip')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const path    = require('ramda/src/path')

const { action, h, handle } = require('../lib/redux')
const request = require('../lib/request')
const { preventDefault, targetVal } = require('../lib/util')

const giphyUri = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='

const init = {
  gif:     'https://goo.gl/RYb70Z',
  loading: true,
  topic:   'cats'
}

exports.reducer = handle(init, {
  Gif:     flip(assoc('gif')),
  Loading: flip(assoc('loading')),
  Topic:   flip(assoc('topic'))
})

const gif = topic =>
  request({ method: 'GET', url: giphyUri + topic, json: true })
    .map(path(['data', 'image_url']))

const more = topic => dispatch => {
  dispatch(action('Loading', true))
  dispatch(action('Gif', gif(topic)))
}

exports.view = state =>
  h('div', { attrs: { class: css.root } }, [
    h('style', css.toString()),

    h('form', {
      attrs: { class: css.form },
      on: { submit: compose(K(more(state.topic)), preventDefault) }
    }, [
      h('input', {
        attrs: {
          class: css.input,
          placeholder: 'Topic',
          type: 'text'
        },
        on: { input: compose(action('Topic'), targetVal) },
        props: { value: state.topic }
      }),

      h('button', {
        attrs: {
          class: css.btn,
          disabled: state.loading,
          type: 'submit'
        }
      }, state.loading ? 'Loading...' : 'More please!')
    ]),

    h('img', {
      attrs: {
        class: css.image,
        src: state.gif
      },
      on: { load: K(action('Loading', false)) }
    })
  ])

const spacing = '1rem'

const css = j2c.sheet({
  '.btn': {
    background: '#fff',
    border: '0.1rem solid #01f',
    borderRadius: '0.2rem',
    cursor: 'pointer',
    display: 'block',
    outline: 'none',
    padding: '0.8rem 1.2rem',
    width: '15rem',

    '&:active': {
      background: '#eee'
    }
  },

  '.form': {
    display: 'flex',
    marginBottom: spacing
  },

  '.image': {
    display: 'block',
    marginBottom: spacing
  },

  '.input': {
    border: '0.1rem solid #ccc',
    borderRadius: '0.2rem',
    marginRight: spacing,
    outline: 'none',
    padding: '0.8rem 1.2rem',
    width: '20rem'
  },

  '.root': {
    margin: '2rem'
  },

  '.topic': {
    margin: `0 0 ${spacing}`,
    textTransform: 'capitalize'
  }
})
