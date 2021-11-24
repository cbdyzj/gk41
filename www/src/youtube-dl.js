import { join } from 'node:path'
import { $ } from 'zx'
import { publicDir } from './config.js'

export async function fetchVideo(url, proxy = '') {
    if (!url) {
        throw new Error('URL required')
    }
    const options = []
    if (proxy) {
        options.push('--proxy', proxy)
    }
    const args = [
        '--rm',
        '-v',
        `${publicDir}:/workdir:rw`,
        'mikenye/youtube-dl',
        ...options,
        url,
    ]
    const out = await $`docker run ${args}`
    const result = /\[download] Destination: (.+)\n/.exec(out.stdout)
    if (!result || !result[1]) {
        throw new Error(out.stdout)
    }
    return join(publicDir, result[1])
}
