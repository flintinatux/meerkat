const { mount } = require('./lib/redux')

const Main = require('./examples/01-buttons')

mount(document.getElementById('root'), Main)
