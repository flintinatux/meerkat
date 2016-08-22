const { h } = require('../lib/redux')

module.exports = content => state =>
  h('div.layout', [
    h('nav.nav', [
      link('#!/counter', '01 - Counter'),
      link('#!/inputs',  '02 - Inputs' ),
      link('#!/forms',   '03 - Forms'  ),
      link('#!/random',  '04 - Random' ),
      link('#!/http',    '05 - HTTP'   ),
      link('#!/time',    '06 - Time'   ),
      link('#!/sockets', '07 - Sockets')
    ]),

    h('section.content', [ content(state) ])
  ])

const link = (href, children='') =>
  h('a.link', {
    attrs: { href },
    class: { active: location.hash === href }
  }, children)
