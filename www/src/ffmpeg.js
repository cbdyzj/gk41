import { join, relative } from 'node:path'
import { $ } from 'zx'
import { FFMPEG_DOCKER_IMAGE, publicDir } from './config.js'

export async function convertToMp4(input = '', removeSourceFile) {
    if (!input || input.endsWith('.mp4')) {
        return
    }

    input = relative(publicDir, input)
    const args = [
        '--rm',
        '-v',
        `${publicDir}:/tmp/workdir:rw`,
        FFMPEG_DOCKER_IMAGE,
        '-i',
        input,
        '-c',
        'copy',
        `${input}.mp4`,
    ]
    await $`docker run ${args}`
    if (removeSourceFile) {
        await $`rm ${join(publicDir, input)}`
    }
}