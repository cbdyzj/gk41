import express from 'express'
import serveIndex from 'serve-index'
import bodyParser from 'body-parser'
import { channels } from './tv.js'
import { fetchVideo } from './youtube-dl.js'
import { PROXY, publicDir, staticDir } from './config.js'
import { convertToMp4 } from './ffmpeg.js'

const app = express()

app.use(express.static(staticDir))
app.use('/public', express.static(publicDir), serveIndex(publicDir, { 'icons': true }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/tv/:channel', (req, res) => {
    const { channel: channelName } = req.params
    const channelItem = channels.find(it => it.name === channelName)
    if (!channelName || !channelItem) {
        res.sendStatus(404)
    } else {
        res.redirect(channelItem.url)
    }
})

app.post('/api/youtube-dl', async (req, res) => {
    const payload = req.body
    if (!payload || !payload.url) {
        res.json({ error: 'URL required' })
    } else {
        try {
            res.json({ payload: 'ok' })
            const fetched = await fetchVideo(payload.url, payload.proxy ? PROXY : '')
            await convertToMp4(fetched, true)
        } catch (err) {
            console.error(err)
        }
    }
})

export default app
