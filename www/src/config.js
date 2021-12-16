import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const staticDir = join(__dirname, 'static')
export const rootDir = join(__dirname, '../..')
export const publicDir = join(rootDir, 'public')

export const PORT = process.env.PORT ?? 3000
export const HTTP_PROXY = process.env.HTTP_PROXY ?? undefined
export const PROXY = process.env.ALL_PROXY ?? 'socks5://127.0.0.1:9080'
export const NANO_TASK_API_TICKET = process.env.NANO_TASK_API_TICKET

// docker images
export const FFMPEG_DOCKER_IMAGE = 'jrottenberg/ffmpeg@sha256:3e65ca52fc9d05ecff6ed1ace87bb17e46f411464c32eb8a11ca5398e59dd95c'
export const YOUTUBE_DL_DOCKER_IMAGE = 'mikenye/youtube-dl@sha256:c361f7c543435d31b452e16de530e51c967355136e13329c29eae0f01c62c8be'
