import express from 'express'
import serveIndex from 'serve-index'
import { channels } from './tv.js'
import { publicDir, staticDir } from './config.js'

const app = express()

app.use(express.static(staticDir))
app.use('/public', express.static(publicDir), serveIndex(publicDir, { 'icons': true }))

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
