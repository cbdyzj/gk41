export function timeTag() {
    // sv: 萨尔瓦多
    return '[' + new Date().toLocaleString('sv', { hour12: false, timeZone: 'Asia/Shanghai' }) + ']'
}