const ws = require('nodejs-websocket')

let server = ws.createServer((conn)=>{
    console.log('有人进入')
    conn.on('text',(str)=>{
        console.log(str)
    })
    conn.on('error',(err)=>{
        console.log(err)
    })
    boardcast(conn)
}).listen(2333,()=>{
    console.log('the server listen 2333')
})

function boardcast(conn){
    server.connections.forEach((conn)=>{
        conn.sendText('来自服务端的消息')
    })
}