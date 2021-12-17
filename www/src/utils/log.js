import { timeTag } from './time.js'

export default {
    info(...args) {
        console.info(timeTag(), ...args)
    },
    error() {
        console.error(timeTag(), ...args)
    },
}