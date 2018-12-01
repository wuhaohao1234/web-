<template>
    <div class="commandCope">
        <div class="tipsCope" >
            <span>
                未命名
            </span>
            <span class="filetTip">
                编码状态
                &nbsp;&nbsp;&nbsp;
                第多少行代码
            </span>
        </div>
        <input type="text" @keyup="addInp" ref="input" >
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import CommandInp from './CommandInp'

export default {
    computed:{
        ...mapState({
            count:state=>state.countState.count,
            fileName:state=>state.staticFileName.fileName,
            dbFile:state=>state.staticFileName.dbFile,
            fileCache:state=>state.cacheFile.fileCache
        })
    },
    mounted(){
        this.CommandInp = new CommandInp(this.dbFile)
        if(!this.count){
            this.$refs.input.focus()
        }
    },
    watch:{
        count(){
            if(!this.count){   
                this.$refs.input.focus()
            }
            return this.count
        }
    },
    methods:{
        ...mapActions([
            'newCount',
            'newFileName',
            'newDbFile'
        ]),
        addInp(event){
            if(event.keyCode === 73&&this.$refs['input'].value.length <= 1) {
                this.newCount()
                this.$refs['input'].value = ''
            }else if(event.keyCode === 13) {
                //传入:input,文件缓存,添加文件方法,更换显示文件方法
                this.CommandInp.Inp(this.$refs['input'],this.fileCache,this.newDbFile,this.newFileName,this.fileName)
            }
        }
    }
}
</script>

<style scoped>
    .commandCope{
        width: 100%;
        overflow: hidden;
        height: 100%;
    }
    .tipsCope{
        height: 40%;
        position: relative;
        padding: 0 1rem;
    }
    .filetTip{
        float: right;
    }
    span{
        display: inline-block;
        margin-top:1rem;
        margin-left: 1rem;
    }
    input{
        display:block;
        width:100%;
        padding:0 30px;
        font-size:20px;
        color:#f60;
        height:30%;
        background:#000;
        line-height:30px;
    }
</style>


