((win,doc)=>{
			let res = ()=>{
				let width = doc.documentElement.clientWidth/16
				if(doc.documentElement.clientWidth > 1100){
					doc.getElementsByTagName('html')[0].style.fontSize = 30 + 'px'
					return
				}
				doc.getElementsByTagName('html')[0].style.fontSize = width + 'px'
			}
			res()
			win.onresize = ()=>{
				res()
			}
		})(window,document)
