var mainFile = document.querySelectorAll('.main_file')
var form = document.querySelectorAll('form')
var confirm = document.querySelector('.confirm')
var selectorUl = document.querySelector('.selector ul')

var formInput = form[0].querySelectorAll('input')

// 移动目录与选项
function reverse(i,j,e) {
	form[i].className = 'form_file'
	form[j].className = 'form_file active'
	e.preventDefault()
}
mainFile[0].onclick = (e)=>{
	reverse(0,1,e)
}
mainFile[1].onclick = (e)=>{
	reverse(1,0,e)
}
confirm.onclick = (e)=>{
	e.preventDefault()
	console.log(formInput)
	var selectorLi = document.createElement('li')
	selectorLi.className = 'item'
	selectorLi.innerHTML = `
		<h3>${formInput[0].value}</h3>
		<button>打开文件</button>
		<p>${formInput[1].value}</p>
		<button class="danger" >删除文件</button>
	`
	selectorUl.appendChild(selectorLi)
}
