let fs = require('fs')
// 判断路径
let pathSrc = (path) => {

	if(!path) {
		console.log(path)

		return './view/index.html'
	}else if(path.search('RequestFileDBJson') != -1) {
		return './server/data/db.json'
	}else if(path.search('data') != -1) {
		path = './server'+path
		console.log(path)
		return path
	}	
	else{
		console.log(path)
		path = './view' + path
		return path
	}
}
// 读取文件
let getReq = (req,res,path,type)=>{
	path = pathSrc(path)
	fs.readFile(path,(err,data)=>{
		if(err) {

			console.log('路径错误')
		}else{
			res.writeHead(200,type)
			res.write(data)
			res.end()
		}
	})
}
module.exports = {
	index:(req,res,path)=>{
		var type = {'Content-Type':'text/html'};
		getReq(req,res,path,type)
	},
	reqImg:(req,res,path)=>{
		var type = {'Content-Type':'image/jpeg'};
		getReq(req,res,path,type);
	},
	reqCss:(req,res,path)=>{
		var type = {'Content-Type':'text/css'};
		getReq(req,res,path,type);
	},
	reqJs:(req,res,path)=>{
		var type = {'Content-Type':'application/javascript'};
		getReq(req,res,path,type);
	},
	reqHtml:(req,res,path)=>{
		var type = {'Content-Type':'text/html'};
		getReq(req,res,path,type);
	},
	// 第一次读取Json
	requestFileDBJson:(req,res,path)=>{
		var type = {'Content-Type':'text'};
		getReq(req,res,path,type);	
	},
	data:(req,res,path)=>{
		var type = {'Content-Type':'text/html'};
		getReq(req,res,path,type);	
	}
}