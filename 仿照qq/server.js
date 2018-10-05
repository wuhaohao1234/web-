let ws = require('nodejs-websocket')

let boardcase = (conn,str)=>{
    server.connections.forEach(()=>{
        conn.sendText(str)
    })
}

let server = ws.createServer((conn)=>{
    conn.on('text', (str) => {
        boardcase(conn,str)
    })
    conn.on('error',(err)=>{
        console.log(err)
    })
    
}).listen(2333,()=>{
    console.log('the server listen 2333')
})

