import { IncomingMessage } from 'node:http'
import { Duplex } from 'node:stream'
import { SocksProxy } from 'socks'

type ConnectListenerOptions = {
    proxy: SocksProxy,
}

type ConnectListener = (req: IncomingMessage, socket: Duplex, head: Buffer) => void

export function createConnectListener(options: ConnectListenerOptions): ConnectListener
