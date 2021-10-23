import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { $ } from 'zx'

const __dirname = dirname(fileURLToPath(import.meta.url))

const gk41Dir = join(__dirname, '../..')
const downloadDir = join(gk41Dir, 'download')

export async function fetchVideo(url, proxy = '') {
    if (!url) {
        throw new Error('URL required')
    }
    if (proxy) {
        proxy = `--proxy ${proxy}`
    }
    const out = await $`docker run --rm -v ${downloadDir}:/workdir:rw mikenye/youtube-dl ${proxy} ${url}`
    const result = /\[download] Destination: (.+)\n/.exec(out.stdout)
    if (!result || !result[1]) {
        throw new Error(out.stdout)
    }
    return join(downloadDir, result[1])
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const downloaded = await fetchVideo(process.argv[2], process.argv[3])
    console.log(downloaded)
}
