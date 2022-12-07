import { setupWorker } from 'msw'

// import pkg from '../../package.json'
import { handlers } from './server-handlers'

// const fullUrl = new URL(pkg.homepage)
const fullUrl = new URL('https://example.org')

const server = setupWorker(...handlers)

server.start({
  quiet: true,
  serviceWorker: {
    url: fullUrl.pathname + 'mockServiceWorker.js',
  },
})
