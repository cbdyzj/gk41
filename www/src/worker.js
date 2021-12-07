import { sleep } from 'zx'

async function scheduleWork(isRunning) {
    while (isRunning()) {
        //
        await sleep(3000)
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