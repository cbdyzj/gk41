import { join } from 'node:path'
import { $ } from 'zx'
import { publicDir, YOUTUBE_DL_DOCKER_IMAGE } from '../config.js'

export default async function fetchVideo(url, proxy = '') {
    if (!url) {
        throw new Error('URL required')
    }
    const extraOptions = []
    if (proxy) {
        extraOptions.push('--proxy', proxy)
    }
    const args = [
        '--rm',
        '-v',
        `${publicDir}:/workdir:rw`,
        YOUTUBE_DL_DOCKER_IMAGE,
        ...extraOptions,
        url,
    ]
    const out = await $`docker run ${args}`
    const result = /\[download] Destination: (.+)\n/.exec(out.stdout)
    if (!result || !result[1]) {
        throw new Error(out.stdout)
    }
    return join(publicDir, result[1])
}
