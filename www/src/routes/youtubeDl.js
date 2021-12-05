import { PROXY } from '../config.js'
import fetchVideo from '../services/fetchVideo.js'
import convertToMp4 from '../services/convertToMp4.js'

export default async function youtubeDl(req, res) {
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
}