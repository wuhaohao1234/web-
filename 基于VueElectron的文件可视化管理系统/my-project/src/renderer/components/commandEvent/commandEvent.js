//这里进行正则匹配value值
/*
i   编辑模式
esc 命令行模式
:cd 文件名/文件目录  进入某个文件/打开某个文件
:ls  展开文件树(默认为展开)
:w  文件名     文件保存
:wq 保存并离开
:mkdir 目录名   创建目录
:h 查看帮助
e
*/
import FileWriteAPI from '../FileLook/FileWriteAPI'
class Command {
    constructor(com,store,commandStr){
        this.com = com
        this.store = store
        this.commandStr = commandStr
        this.init()
    }
    init(){
        this.readFileReg = [
            /^e\b([\s\S]*)/
        ]
        this.writeFileReg = [
            /^w\b([\s\S]*)/
        ]
        this.readFile()
        this.writeFile()
    }
    readFile() {
        if (this.readFileReg[0].test(this.commandStr)) {
            var srcFileName = this.commandStr.replace('e ', '')
            this.store.dispatch('newFile', srcFileName)
        } else if (this.commandStr === 'help') {
            this.store.dispatch('newFile', 'help.md')
        }
        this.com.value = ''
        this.store.dispatch('newCount')
    }
    writeFile(){
        if (this.writeFileReg[0].test(this.commandStr)) {
            var srcFileName = this.commandStr.replace('w ', '')
            console.log(this.store.state.initFileCache)
            var data = this.store.state.initFileCache
            FileWriteAPI(srcFileName,data)
        }
    }
}


export default Command