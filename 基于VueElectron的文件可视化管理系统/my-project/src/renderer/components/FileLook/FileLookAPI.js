import fs from 'fs'
import path from 'path'

//查看文件
export default (src)=>{
	let fileContents = fs.readFileSync(path.join(__static, src), 'utf8')
	return fileContents
}