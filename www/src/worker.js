import { sleep } from 'zx'
import { getTaskList } from './services/nanoTask.js'
import log from './utils/log.js'

async function executeTask() {
    try {
        const taskList = await getTaskList()
        log.info('getTaskList', taskList)
    } catch (err) {
        log.error('getTaskList', err.message)
    }
}

export async function scheduleWork(isRunning) {
    while (isRunning()) {
        await executeTask()
        await sleep(3 * 1000)
    }
}
