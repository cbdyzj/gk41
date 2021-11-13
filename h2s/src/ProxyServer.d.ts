export type ProxyServerOption = {
    proxy: {
        ipaddress: string,
        port: number,
        type: number,
    },
    host: string,
    port: number,
}

export default class ProxyServer {

    constructor(options: ProxyServerOption);

    start(callback?: () => void);
}