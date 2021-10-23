import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const staticDir = join(__dirname, 'static')
export const rootDir = join(__dirname, '../..')
export const publicDir = join(rootDir, 'public')
export const defaultProxy = 'socks5://127.0.0.1:9080'