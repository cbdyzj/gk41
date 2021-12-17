import { PROXY } from '../config.js'
import fetchVideo from '../services/fetchVideo.js'
import convertToMp4 from '../services/convertToMp4.js'
import { isValidHttpUrl } from '../utils/url.js'
import log from '../utils/log.js'

export async function youtubeDl(req, res) {
    const payload = req.body
    if (!payload || !payload.url) {
        res.json({ error: 'URL required' })
    } else {
        try {
            res.json({ payload: 'ok' })
            const fetched = await fetchVideo(payload.url, payload.proxy ? PROXY : '')
            await convertToMp4(fetched, true)
        } catch (err) {
            log.error(err)
        }
    }
}

export async function youtubeDlAndRedirect(req, res) {
    const url = req.query.url
    const proxy = req.query.proxy
    const params = new URLSearchParams()
    params.append('url', url)
    if (!url || !isValidHttpUrl(url)) {
        params.append('status', 'failed')
        res.redirect(`/youtube-dl/redirect.html?${params.toString()}`)
    } else {
        params.append('status', 'succeed')
        res.redirect(`/youtube-dl/redirect.html?${params.toString()}`)
        try {
            const fetched = await fetchVideo(url, proxy ? PROXY : '')
            await convertToMp4(fetched, true)
        } catch (err) {
            log.error(err)
        }
    }
}