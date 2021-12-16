import { fetch } from 'zx'
import { NANO_TASK_API_TICKET } from '../config.js'

export async function getTaskList() {
    const params = new URLSearchParams()
    params.append('status', 'CREATED')
    const response = await fetch(`https://natrium.herokuapp.com/api/task/list?${params.toString()}`, {
        headers: {
            'X-Ticket': NANO_TASK_API_TICKET,
        },
    })
    const result = await response.json()
    if (result.error) {
        throw new Error(result.error)
    }
    return result.payload
}
