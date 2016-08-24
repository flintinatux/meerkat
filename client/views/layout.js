const { h, route: { href } } = require('puddles')

const layout = content => state =>
  h('div.layout', [
    h('nav.nav', [
      link(href('/counter'), '01 - Counter'),
      link(href('/inputs'),  '02 - Inputs' ),
      link(href('/forms'),   '03 - Forms'  ),
      link(href('/random'),  '04 - Random' ),
      link(href('/http'),    '05 - HTTP'   ),
      link(href('/time'),    '06 - Time'   ),
      link(href('/sockets'), '07 - Sockets')
    ]),

    h('section.content', [ content(state) ])
  ])

const link = (href, children='') =>
  h('a.link', {
    attrs: { href },
    class: { active: location.hash === href }
  }, children)

module.exports = layout
