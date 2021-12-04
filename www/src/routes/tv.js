import { channels } from '../services/tv.js'

export default function tv(req, res) {
    const { channel: channelName } = req.params
    const channelItem = channels.find(it => it.name === channelName)
    if (!channelName || !channelItem) {
        res.sendStatus(404)
    } else {
        res.redirect(channelItem.url)
    }
}