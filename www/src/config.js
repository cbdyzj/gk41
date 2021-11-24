import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const staticDir = join(__dirname, 'static')
export const rootDir = join(__dirname, '../..')
export const publicDir = join(rootDir, 'public')

export const PORT = process.env.PORT ?? 3000
export const PROXY = process.env.PROXY ?? 'socks5://127.0.0.1:9080'
