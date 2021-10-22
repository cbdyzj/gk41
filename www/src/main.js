import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.static(join(__dirname, 'static')))

app.get('/ping', (req, res) => {
    res.end('pong')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Serving on port ' + port)
})
