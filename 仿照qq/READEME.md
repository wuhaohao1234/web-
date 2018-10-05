# 仿照qq

## websocket:可以跨域

## 安装

```
    npm install nodejs-websocket
```

## 服务端:

```
    let server = ws.createServer((conn)=>{

    }).listen(2333,()=>{
        console.log('the server listen 2333')
    })
```

## 客户端:

```
    let ws = new WebSocket('ws://localhost:2333')    
```
## 客户端向服务端发送数据:

```
    ws.onopen = ()=>{
        ws.send('来自客户端的数据')
    }
```

## 服务端接收信息:
```
    conn.on('text',(str)=>{
        console.log(str)
    })
```

## 服务端发送数据

```
    conn.sendText('来自服务端的数据')
```
## 客户端接受数据

```
    ws.onmessage = (e)=>{
        console.log(e.data)
    }
```
## server.connections是个数组

## 实例:

## 客户端:

* 表单,展示页