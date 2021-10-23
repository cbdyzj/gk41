import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { channels } from './tv.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.static(join(__dirname, 'static')))

app.get('/ping', (req, res) => {
    res.end('pong')
})

app.get('/tv/:channel', (req, res) => {
    const { channel: channelName } = req.params
    const channelItem = channels.find(it => it.name === channelName)
    if (!channelName || !channelItem) {
        res.sendStatus(404)
    } else {
        res.redirect(channelItem.url)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Serving on port ' + port)
})
