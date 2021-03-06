const channels = [{
    name: 'cctv6',
    url: 'http://39.134.39.39/PLTV/88888888/224/3221226226/index.m3u8',
}, {
    name: 'cctv13',
    url: 'http://39.134.115.163:8080/PLTV/88888910/224/3221225638/index.m3u8',
}, {
    name: 'cctv5',
    url: 'http://39.134.115.163:8080/PLTV/88888910/224/3221225633/index.m3u8',
}]

channels.push(...channels.map(it => {
    return {
        name: `${it.name}.m3u8`,
        url: it.url,
    }
}))

export {
    channels,
}