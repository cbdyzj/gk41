import { SocksClient } from 'socks'

/**
 * @param {ConnectListenerOptions} options
 * @returns {ConnectListener}
 */
export function createConnectListener(options) {

    const { proxy } = options

    return (request, requestSocket, head) => {
        let proxySocket

        requestSocket.on('error', (err) => {
            console.error('Request Socket Error', err.message)
            if (proxySocket) {
                proxySocket.destroy(err)
            }
        })

        const requestUrl = new URL(`http://${request.url}`)
        const host = requestUrl.hostname
        const port = requestUrl.port | 0

        SocksClient.createConnection({
            proxy,
            destination: { host, port, },
            command: 'connect',
        }).then((conn) => {
            proxySocket = conn.socket

            proxySocket.on('error', (err) => {
                console.error('Proxy Socks Error', err.message)
                requestSocket.destroy(err)
            })

            proxySocket.write(head)
            requestSocket.write(`HTTP/${request.httpVersion} 200 Connection Established\r\n\r\n`)

            proxySocket.pipe(requestSocket)
            requestSocket.pipe(proxySocket)
        }).catch((err) => {
            console.error('Create Socks Connection Error', `${proxy.ipaddress}:${proxy.port}`, err.message)
            requestSocket.write(`HTTP/${request.httpVersion} 500 Connection Error\r\n\r\n`)
        })
    }
}
