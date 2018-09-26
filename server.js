let http = require('http')
let urlLib = require('url')
let app =http.createServer((req,res)=>{
  let params = urlLib.parse(req.url, true).query;
	let callback = params.callback;
  console.log(callback)
  let data = '123'
  res.end(callback + "(" + data + ")")
})

app.listen(3000,()=>{
  console.log('the server listen 3000')
})
