import { sleep } from 'zx'
import { getTaskList } from './services/nanoTask.js'

async function executeTask() {
    try {
        const taskList = await getTaskList()
        console.info('taskList', taskList)
    } catch (err) {
        console.error('getTaskList', err.message)
    }
}

export async function scheduleWork(isRunning) {
    while (isRunning()) {
        await executeTask()
        await sleep(3 * 1000)
    }
}
