import { timeTag } from './time.js'

export default {
    info(...args) {
        console.info(timeTag(), ...args)
    },
    error(...args) {
        console.error(timeTag(), ...args)
    },
}