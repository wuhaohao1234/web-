import fs from 'fs'
import path from 'path'

//查看文件
export default (src,data) => {
    let fileContents = fs.writeFileSync(path.join(__static, src),data)
}