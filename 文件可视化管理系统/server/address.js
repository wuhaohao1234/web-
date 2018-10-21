let api = require('./controllers/API.js')

let address = (path,request,response) => {
	var Post = new RegExp('/post').test(path);
	var Get = new RegExp('/get').test(path);
	var Css = new RegExp('css').test(path);
	var Img = new RegExp('images').test(path);
	var Js = new RegExp('js').test(path);
	var html = new RegExp('html').test(path)
	var data = new RegExp('data').test(path);

	var RequestFileDBJson = new RegExp('RequestFileDBJson').test(path)
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
	}else if(RequestFileDBJson)
	{
		api['requestFileDBJson'](request,response,path);		
	}else if(data)
	{
		console.log(path)
		api['data'](request,response,path);		
	}
}
module.exports = address