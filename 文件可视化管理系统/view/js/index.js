class FileSytem {
	constructor() {
		this.banner = document.getElementsByClassName('banner')[0]
		this.init()
	}
	init() {
		var _this = this
		axios.get('http://localhost:4399/RequestFileDBJson')
		.then(function (response) {
			_this.data = response.data
			_this.render(_this.data)
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	render(data) {
		this.ul = document.createElement('ul')
		this.banner.appendChild(this.ul)
		for(var key in data) {
			var li = document.createElement('li')
			li.className = 'FileSytemLi'
			li.innerHTML = `
				<div class="name">${data[key].name}</div>
				<button class="src" key=${data[key].src} >进入文件</button>
				<span>${data[key].commit}</span>
			`
			this.ul.appendChild(li)
		}
		this.action()
	}
	action() {
		var FileSytemLi = document.getElementsByClassName('FileSytemLi')
		for(var i = 0;i < FileSytemLi.length;i ++) {
			(function(i){
				FileSytemLi[i].onclick= function(ev) {
					if(ev.target.tagName == 'BUTTON') {
						var src = 'http://localhost:4399/'+ ev.target.getAttribute('key')
						axios.get(src)
						.then(function(response){
							console.log(response.data)
						})
					}
				}
			})(i)
		}
	}
}
new FileSytem()


