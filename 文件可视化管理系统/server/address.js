let api = require('./controllers/API.js')

let address = (path,request,response) => {
	
	var Post = new RegExp('/post').test(path);
	var Get = new RegExp('/get').test(path);
	var Css = new RegExp('css').test(path);
	var Img = new RegExp('images').test(path);
	var Js = new RegExp('js').test(path);
	var html = new RegExp('html').test(path);
	// 匹配上传文件
	var Demo = new RegExp('/main/server/data').test(path)
	if(path == '/') {
		api['index'](request,response)
	}
	else if(Img)
	{
		api['reqImg'](request,response,path);
	}
	else if(Css)
	{
		api['reqCss'](request,response,path);
	}
	else if(Js)
	{
		api['reqJs'](request,response,path);
	}
	else if(html)
	{
		api['reqHtml'](request,response,path);	
	}
	else if(Post)
	{
		api['post'](request,response,path);		
	}
	else if(Get)
	{
		api['get'](request,response,path);		
	}
	// 读取db.json文件信息
	else if(path == '/message')
	{
		api['message'](request,response,path);		
	}
	else if(Demo)
	{
		path = path.replace('/main','.')
		console.log(path)
		api['data'](request,response,path)
	}
}
module.exports = address