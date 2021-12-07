import { PORT } from './config.js'
import worker from './worker.js'
import service from './service.js'

function startWorker() {
    worker.start(() => {
        console.log('Worker started')
    }, () => {
        console.log('Worker stopped')
    })
}

service.listen(PORT, () => {
    console.log('Serving on port ' + PORT)

    startWorker()
})
