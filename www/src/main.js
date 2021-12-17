import { $ } from 'zx'
import { PORT } from './config.js'
import { scheduleWork } from './worker.js'
import service from './service.js'
import log from './utils/log.js'

$.verbose = false

function startWorker() {
    scheduleWork(() => true).catch(err => {
        log.error(err)
    })
}

service.listen(PORT, () => {
    log.info('Serving on port ' + PORT)

    startWorker()
})
