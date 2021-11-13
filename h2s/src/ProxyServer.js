import { createServer } from 'http'
import { promisify } from 'util'
import { SocksClient } from 'socks'

class ProxyServer {

    constructor(options) {
        this.options = options
    }

    async handleConnect(request, requestSocket, head) {
        let proxySocket
        try {
            const requestUrl = new URL(`http://${request.url}`)
            const host = requestUrl.hostname
            const port = requestUrl.port | 0

            const conn = await SocksClient.createConnection({
                proxy: this.options.proxy,
                destination: { host, port, },
                command: 'connect',
            })

            proxySocket = conn.socket

            proxySocket.on('error', (err) => {
                console.error(`${err.message}`)
                requestSocket.destroy(err)
            })

            proxySocket.pipe(requestSocket)
            requestSocket.pipe(proxySocket)

            proxySocket.write(head)
            requestSocket.write(`HTTP/${request.httpVersion} 200 Connection established\r\n\r\n`)
            proxySocket.resume()
        } catch (err) {
            console.error(`${err.message}`)
            requestSocket.write(`HTTP/${request.httpVersion} 500 Connection error\r\n\r\n`)
            if (proxySocket) {
                proxySocket.destroy(err)
            }
        }
    }

    async start() {
        const server = createServer()
        server.addListener('connect', this.handleConnect.bind(this))
        return promisify(server.listen.bind(server))(this.options.port)
    }
}

export function startProxyServer(options) {
    return new Promise((resolve, reject) => {
        try {
            new ProxyServer(options).start()
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}
