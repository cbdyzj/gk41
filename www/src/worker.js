import { sleep } from 'zx'
import { getTaskList } from './services/nanoTask.js'

async function executeTask() {
    try {
        const taskList = await getTaskList()
        console.info('taskList', taskList)
    } catch (err) {
        console.error('Get tasks: ', err.message)
    }
}

async function scheduleWork(isRunning) {
    while (isRunning()) {
        await executeTask()
        await sleep(30_000)
    }
}

export default {
    running: false,
    start(startedCallback, stoppedCallback) {
        this.running = true
        setTimeout(() => {
            scheduleWork(() => this.running)
                .then(() => {
                    stoppedCallback?.()
                })
                .catch((err) => {
                    console.error(err)
                    this.stop()
                })
        })
        startedCallback?.()
    },
    stop() {
        this.running = false
    }
}