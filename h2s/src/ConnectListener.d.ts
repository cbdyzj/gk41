import { IncomingMessage } from 'http'
import { Duplex } from 'stream'
import { SocksProxy } from 'socks'

type ConnectListenerOptions = {
    proxy: SocksProxy,
}

type ConnectListener = (req: IncomingMessage, socket: Duplex, head: Buffer) => void

export function createConnectListener(options: ConnectListenerOptions): ConnectListener
