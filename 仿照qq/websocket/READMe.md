# websocket

## 安装:
` npm install nodejs-websocket `

## server端口:

```
    const ws = require('nodejs-websocket')

    let server = ws.createServer((conn)=>{
        console.log('有人进入')
    }).listen(2333,()=>{
        console.log('the server listen 2333')
    })
```
## 客户端:
```
    let ws = new WebSocket('ws://localhost:2333')
```


### 消息传递

* 客户端向服务端推送消息
```
    ws.onopen = ()=>{
        ws.send('来自客户端的信息')
    }
```
* 客户端接受服务端消息
```
    ws.onmessage = (e)=>{
        console.log(e.data)
    }
```
* 服务端接收客户端消息
```
    conn.on('text',(str)=>{
        console.log(str)
    })
```

* 服务端向客户端发送消息
```
    conn.sendText('来自服务端的消息')
```

* 群发

```
    server.connections
```
- server.connections.forEach((conn)=>{
    conn.sendText('来自服务端的消息')
})