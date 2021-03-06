import express from 'express'
import serveIndex from 'serve-index'
import bodyParser from 'body-parser'
import { publicDir, staticDir } from './config.js'
import tvChannel from './routes/tvChannel.js'
import { youtubeDl, youtubeDlAndRedirect } from './routes/youtubeDl.js'

const app = express()

app.use(express.static(staticDir))
app.use('/public', express.static(publicDir), serveIndex(publicDir, { icons: true, view: 'details' }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/tv/:channel', tvChannel)
app.post('/api/youtube-dl', youtubeDl)
app.get('/api/youtube-dl', youtubeDlAndRedirect)

export default app
