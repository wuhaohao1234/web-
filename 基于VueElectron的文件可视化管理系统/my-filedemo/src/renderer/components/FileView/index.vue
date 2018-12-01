<template>
    <div class="FileView" @keyup="addCommandCount" >
        <div v-if="false"></div>
        <div class="editor"></div>
        <textarea @keyup="addTxt" ></textarea>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import fileRead from './fileRead.js'
import fileShow from './fileShow.js'
export default {
    computed:{
        ...mapState({
            fileName:state=>state.staticFileName.fileName,
            count:state=>state.countState.count,
            fileCache:state=>state.cacheFile.fileCache
        })
    },
    mounted(){
        this.file = fileRead(this.fileName)
        this.fileShow = new fileShow(this.file)
        // 将编辑区添加到缓存
        // this.fileShow.editor.$textElem.attr('contenteditable', this.count)
        this.newFileCache(this.file.txt)
        this.fileShow.init()
    },
    watch:{
        count(){
            if(this.count) {
                this.fileShow.textarea.focus()
            }
            this.fileShow.distinguish(this.count,this.fileCache)
            return this.count
        },
        fileName(){
            this.file = fileRead(this.fileName)
            this.newFileCache(this.file.txt)
            this.fileShow.distinguish(this.file.txt)
            this.newCount()
            return this.fileName
        }
    },
    methods:{
        ...mapActions([
            'newFileName',
            'newCount',
            'newFileCache'
        ]),
        addCommandCount(event){
            //按下esc键
            if(event.keyCode === 27) {
                this.newCount()
            }
        },
        addTxt(event){
            this.newFileCache(this.fileShow.textarea.value)
        }
    }
}
</script>

<style scoped>
    .FileView{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    .editor{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    textarea {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top:-120%;
        left: 0;
        font-family:monospace;
        font-size: 18px;
        resize: none;
        padding: 0.6em;
        border: 0;
        overflow: auto;
        flex-grow: 1;
        flex-shrink: 1;
        background: rgba(192,249,19,0.3);
    }
</style>


