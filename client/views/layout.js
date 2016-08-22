const { h } = require('../lib/redux')

module.exports = content => state =>
  h('div.layout', [
    h('nav.nav', [
      h('a.page', { attrs: { href: '#!/counter' } }, '01 - Counter'),
      h('a.page', { attrs: { href: '#!/inputs'  } }, '02 - Inputs' ),
      h('a.page', { attrs: { href: '#!/forms'   } }, '03 - Forms'  ),
      h('a.page', { attrs: { href: '#!/random'  } }, '04 - Random' ),
      h('a.page', { attrs: { href: '#!/http'    } }, '05 - HTTP'   ),
      h('a.page', { attrs: { href: '#!/time'    } }, '06 - Time'   ),
      h('a.page', { attrs: { href: '#!/sockets' } }, '07 - Sockets')
    ]),

    h('section.content', [ content(state) ])
  ])

