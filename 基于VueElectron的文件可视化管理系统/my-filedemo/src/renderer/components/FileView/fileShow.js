import E from 'wangeditor'
import marked from 'marked'
class FileShow {
    constructor(data) {
        this.data = data
        this.textarea = document.querySelector('textarea')
        this._editor = document.querySelector('.editor')
    }
    init() {
        this.editor = new E('.null', '.editor')
        this.editor.create()
        //初始化的时候查看帮助  
        this.editor.txt.html(this.data.markedtxt)
        //默认不可编辑
        this.editor.$textElem.attr('contenteditable', false)
    }
    distinguish(count,fileCache){
        if(count) {
            this.textarea.value = fileCache
            this.textarea.style.top = 0
            this._editor.style.top = '-100%'
        }else{
            this.textarea.style.top = '-150%'
            this._editor.style.top = 0
            this.editor.txt.html(marked(fileCache))
            // this.data.txt = fileCache
        }
    }
}
export default FileShow