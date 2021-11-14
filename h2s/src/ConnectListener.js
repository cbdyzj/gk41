import { SocksClient } from 'socks'

/**
 * @param {ConnectListenerOptions} options
 * @returns {ConnectListener}
 */
export function createConnectListener(options) {

    return (request, requestSocket, head) => {
        let proxySocket

        requestSocket.on('error', (err) => {
            console.error(`${err.message}`)
            if (proxySocket) {
                proxySocket.destroy(err)
            }
        })

        const requestUrl = new URL(`http://${request.url}`)
        const host = requestUrl.hostname
        const port = requestUrl.port | 0

        SocksClient.createConnection({
            proxy: options.proxy,
            destination: { host, port, },
            command: 'connect',
        }).then((conn) => {
            proxySocket = conn.socket

            proxySocket.on('error', (err) => {
                console.error(`${err.message}`)
                requestSocket.destroy(err)
            })

            proxySocket.write(head)
            requestSocket.write(`HTTP/${request.httpVersion} 200 Connection established\r\n\r\n`)

            proxySocket.pipe(requestSocket)
            requestSocket.pipe(proxySocket)
        }).catch((err) => {
            console.error(`${err.message}`)
            requestSocket.write(`HTTP/${request.httpVersion} 500 Connection error\r\n\r\n`)
        })
    }
}
