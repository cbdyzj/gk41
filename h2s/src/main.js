import { createServer } from 'node:http'
import { createConnectListener } from './ConnectListener.js'

const options = {
    proxy: {
        ipaddress: '127.0.0.1',
        port: 9080,
        type: 5,
    },
}

const host = '0.0.0.0'
const port = 8080

createServer()
    .addListener('connect', createConnectListener(options))
    .listen(port, host, () => {
        console.log(`Serving on ${host}:${port}`)
    })
