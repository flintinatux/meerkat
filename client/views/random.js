const compose = require('ramda/src/compose')
const K = require('ramda/src/always')

const { h } = require('../lib/redux')
const IO    = require('../lib/io')
const { setFace } = require('../ducks/random')

const roll = IO(Math.random).map(x => Math.ceil(x * 6))

module.exports = ({ random: { face } }) =>
  h('div.random', [
    h('h1.face', face),

    h('button.btn.roll', {
      on: { click: compose(setFace, IO.runIO, K(roll)) }
    }, 'Roll')
  ])
