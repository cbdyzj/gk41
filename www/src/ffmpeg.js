import { join, relative } from 'path'
import { $ } from 'zx'
import { publicDir } from './config.js'

export async function convertToMp4(input = '', removeSourceFile) {
    if (!input || input.endsWith('.mp4')) {
        return
    }

    input = relative(publicDir, input)
    const args = [
        '--rm',
        '-v',
        `${publicDir}:/tmp/workdir:rw`,
        'jrottenberg/ffmpeg',
        '-i',
        input,
        `${input}.mp4`,
    ]
    await $`docker run ${args}`
    if (removeSourceFile) {
        await $`rm ${join(publicDir, input)}`
    }
}