import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const downloaded = await fetchVideo(process.argv[2], process.argv[3])
    console.log(downloaded)
}
