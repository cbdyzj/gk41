import { $ } from 'zx'
import { PORT } from './config.js'
import { scheduleWork } from './worker.js'
import service from './service.js'

$.verbose = false

function startWorker() {
    scheduleWork(() => true).catch(err => {
        console.error(err)
    })
}

service.listen(PORT, () => {
    console.log('Serving on port ' + PORT)

    startWorker()
})
