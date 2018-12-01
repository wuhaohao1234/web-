import fs from 'fs'
import path from 'path'

class CommandInp {
    constructor(dbFile) {
        this.dbFile = dbFile
        this.regOpen = /^e\b([\s\S]*)/
        this.regWrite = /^w\b([\s\S]*)/
    }
    Inp(inpTxt, fileCache, newDbFile, newFileName, fileName) {
        var value = inpTxt.value
        if (this.regOpen.test(value)) {
            this.readFile(this.dbFile, value, newFileName)
        } else if (this.regWrite.test(value)) {
            this.writeFile(this.dbFile, value, fileCache, newDbFile, newFileName,fileName)
        } else if (value === 'help') {
            newFileName('help.md')
        }
        inpTxt.value = ''
    }
    readFile(dbFile, value, newFileName) {
        value = value.replace('e ', '')
        if (this.forDbfile(dbFile, value)) {
            newFileName(value)
        } else {
            console.log('文件没有')
        }
    }
    writeFile(dbFile, value, fileCache, newDbFile, newFileName,fileName) {
        if(value === 'w') {
            alert('请写入文件名')
            return
        }
        value = value.replace('w ', '')
        if (this.forDbfile(dbFile, value)) {
            //如果文件存在，则不需要再次添加
            newFileName(value)
        } else {
            newDbFile({
                fileName: value,
                type: 'file'
            })
            var str = JSON.stringify({
                "dbFile": dbFile
            })
            fs.writeFileSync(path.join(__static, 'db.json'), str)
        }
        fs.writeFileSync(path.join(__static, value), fileCache)
    }
    forDbfile(dbFile, value) {
        for (var i = 0; i < dbFile.length; i++) {
            if (dbFile[i].type === 'folder') {
                this.forDbfile(dbFile[i].children, value)
            } else {
                if (dbFile[i].fileName === value) {
                    return true
                }
            }
        }
    }
}
export default CommandInp



/*
    class CommandInp {
        constructor(newFileName,newDbFile){
            this.newFileName = newFileName
            this.newDbFile = newDbFile
            this.value = ''
            this.regOpen = /^e\b([\s\S]*)/
            this.regWrite = /^w\b([\s\S]*)/
            this.FileWrite = new FileWrite()
        }
        Inp(value,dbFile,fileCache,newDbFile){
            this.value = value
            this.distinguish(this.value,dbFile,fileCache,this.newDbFile)
        }
        distinguish(value,dbFile,fileCache,newDbFile){
            if(this.regOpen.test(value)) {
                value = value.replace('e ','')
                //这里要判断文件是否存在，若存在则读取文件，若不存在，则新建文件
                if(this.FileWrite.fsReadFile(value,dbFile)) {
                    this.newFileName(value)
                }else{
                    this.FileWrite.fsWriteFile(value,fileCache,dbFile,newDbFile)
                }
                
            }else if(value === 'help') {
                this.newFileName('help.md')
            }else if(this.regWrite.test(value)) {
                //这里是写入文件
                this.newFileName('测试.md')
            }else{
                alert('指令错误')
            }
        }
    }
    export default CommandInp
*/