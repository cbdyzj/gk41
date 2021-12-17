import { sleep } from 'zx'
import { getTaskList } from './services/nanoTask.js'

async function executeTask() {
    try {
        const taskList = await getTaskList()
        console.info(`[${new Date().toISOString()}]`, 'getTaskList', taskList)
    } catch (err) {
        console.error(`[${new Date().toISOString()}]`, 'getTaskList', err.message)
    }
}

export async function scheduleWork(isRunning) {
    while (isRunning()) {
        await executeTask()
        await sleep(3 * 1000)
    }
}
