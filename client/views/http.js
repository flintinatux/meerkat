const compose = require('ramda/src/compose')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const path    = require('ramda/src/path')

const { h }   = require('../lib/redux')
const { preventDefault, targetVal } = require('../lib/util')
const request = require('../lib/request')
const { setGif, setLoading, setTopic } = require('../ducks/http')

const giphyUri = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='

const giphy = topic =>
  request({ method: 'GET', url: giphyUri + topic, json: true })
    .map(path(['data', 'image_url']))

const more = topic => dispatch => {
  dispatch(setLoading(true))
  dispatch(setGif(giphy(topic)))
}

module.exports = ({ http: { gif, loading, topic } }) =>
  h('div.http', [
    h('form.form', {
      on: { submit: compose(K(more(topic)), preventDefault) }
    }, [
      h('input.input.topic', {
        attrs: {
          placeholder: 'Topic',
          type: 'text'
        },
        on: { input: compose(setTopic, targetVal) },
        props: { value: topic }
      }),

      h('button.btn.more', {
        attrs: {
          disabled: loading,
          type: 'submit'
        }
      }, loading ? 'Loading...' : 'More please!')
    ]),

    h('img.image', {
      attrs: { src: gif },
      on: { load: K(setLoading(false)) }
    })
  ])
