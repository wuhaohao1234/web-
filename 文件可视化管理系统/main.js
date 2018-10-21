let http = require('http')
let url = require('url')

let address = require('./server/address.js')

let onRequest =(request,response) => {
	if(request.url !== '/favicon.ico') {

		let path = url.parse(request.url).pathname;
		// 地址输入判断引擎
		address(path,request,response)	
	}
}


http.createServer(onRequest).listen(4399,()=>{
	console.log('the server listen in 4399')
})