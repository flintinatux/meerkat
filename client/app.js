const { mount } = require('./lib/redux')

const Main = require('./examples/07-websockets')

mount(document.getElementById('root'), Main)
