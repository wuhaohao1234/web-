import fs from 'fs'
import path from 'path'
import marked from 'marked'
//读取文件
export default (src) => {
    let fileContents = fs.readFileSync(path.join(__static, src), 'utf8')
    return {
        markedtxt: marked(fileContents),
        txt: fileContents
    }
}