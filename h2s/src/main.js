import { startProxyServer } from './ProxyServer.js'

const options = {
    proxy: {
        ipaddress: '127.0.0.1',
        port: 9080,
        type: 5,
    },
    host: '0.0.0.0',
    port: 8080,
}

await startProxyServer(options)
console.log(`Serving on ${options.host}:${options.port}`)