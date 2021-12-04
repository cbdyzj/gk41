import express from 'express'
import serveIndex from 'serve-index'
import bodyParser from 'body-parser'
import { publicDir, staticDir } from './config.js'
import tv from './routes/tv.js'
import youtubeDl from './routes/youtube-dl.js'

const app = express()

app.use(express.static(staticDir))
app.use('/public', express.static(publicDir), serveIndex(publicDir, { icons: true, view: 'details' }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/tv/:channel', tv)
app.post('/api/youtube-dl', youtubeDl)

export default app
