let fs = require('fs')
// 判断路径
let pathSrc = (path) => {
	if(!path) {
		return './view/index.html'
	}else{
		path = './view' + path
		console.log(path)
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
// 读取fs文件
let getReqFs = (req,res,path,type)=>{
	fs.readFile(path,(err,data)=>{
		if(err) {

			console.log('路径错误')
		}else{
			res.writeHead(200)
			res.end(data)
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
	message:(req,res,path)=>{
		getReqFs(req,res,'./server/controllers/db.json')
	},
	data:(req,res,path)=>{
		getReqFs(req,res,path+'.html')
	},
}

// fs读取文件

// fs.readFile('./server/controllers/db.json',(err,data)=>{
// 	if(err) {
// 		console.log(err)
// 	}else{
// 		console.log(data)
// 	}
// })