import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import tv from './tv.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.static(join(__dirname, 'static')))

app.get('/ping', (req, res) => {
    res.end('pong')
})

app.get('/tv/:channel', (req, res) => {
    const { channel } = req.params
    if (!channel || !tv[channel]) {
        res.sendStatus(404)
    } else {
        res.redirect(tv[channel])
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Serving on port ' + port)
})
