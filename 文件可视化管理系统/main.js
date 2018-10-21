let http = require('http')
let url = require('url')

let address = require('./server/address.js')
//处理请求
let onRequest =(request,response) => {
	if(request.url !== '/favicon.ico') {

		let path = url.parse(request.url).pathname;
		address(path,request,response)	
	}else{
		response.end()
	}
}


http.createServer(onRequest).listen(4399,()=>{
	console.log('the server listen in 4399')
})