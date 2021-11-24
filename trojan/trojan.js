#!/usr/bin/env node
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import 'zx/globals'

$.verbose = false

const __dirname = dirname(fileURLToPath(import.meta.url))
cd(__dirname)

const subscriptionUrl = process.env.TROJAN_URL

async function fetchConfig(subscriptionUrl) {
    if (!subscriptionUrl) {
        throw new Error('No subscription URL')
    }
    const response = await fetch(subscriptionUrl)
    const subscription = Buffer.from(await response.text(), 'base64').toString('utf8')
    const clientJson = await $`cat client.json`
    const clientConfig = JSON.parse(clientJson)
    return subscription.split('\n')
        .filter(it => !!it)
        .map(it => {
            const url = new URL(it)
            return {
                name: decodeURIComponent(url.hash).substring(1),
                value: {
                    ...clientConfig,
                    remote_addr: url.hostname,
                    password: [url.username],
                },
            }
        })
}

async function saveConfig(configList) {
    await $`rm -rf config`
    await $`mkdir -p config`
    for (const config of configList) {
        await $`echo ${JSON.stringify(config.value, null, 2)} > config/${config.name}.json`
    }
}

async function refreshConfig() {
    const configList = await fetchConfig(subscriptionUrl)
    console.info(`${configList.length} trojan node config fetched`)
    await saveConfig(configList)
}

async function main() {
    if (process.argv.includes('-r')) {
        await refreshConfig()
    }
    console.clear()
    const existConfig = await $`ls config`
    const existConfigList = existConfig.toString().split('\n').filter(it => !!it)
    console.info(existConfigList.map((it, index) => `${index + 1}.${it.replace(/\.json$/, '')}`).join('\n'))
    const node = await question('Choose trojan node: ')
    const chosenConfig = existConfigList[(node | 0) - 1]
    if (!chosenConfig) {
        console.info('No config chosen, exit')
        return
    }
    console.info(`Use config: ${chosenConfig.replace(/\.json$/, '')}`)
    const args = [
        '-d',
        '--rm',
        '--name',
        'trojan',
        '-v',
        `${join(__dirname, 'config')}:/config:ro`,
        '-p',
        '9080:9080',
        'trojangfw/trojan',
        'trojan',
        '-c',
        chosenConfig,
    ]
    const s = await $`docker run ${args}`
    console.log('Trojan service started: ', s.toString())
}

main().catch(err => console.error(err))
