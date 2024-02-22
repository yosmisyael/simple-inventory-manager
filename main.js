const server = require('./src/app/server')
const dotenv = require('dotenv')
dotenv.config()

const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1'

server.listen(5000, host, () => {
    console.log(`app running on ${host}:5000`)
    // const serverInfo = server.address()
    // console.log(serverInfo.host)
    // if (serverInfo) {
    //     console.log(`app running on ${serverInfo.host}:${serverInfo.port}`)
    // } else {
    //     console.log('failed to load app address')
    // }
})