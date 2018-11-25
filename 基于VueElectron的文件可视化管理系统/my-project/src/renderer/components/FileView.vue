<template>
  <div class="FileView" >
    <div v-if="false" class="null"></div>
    <div v-on:keyup="addEventkey" class="editor"></div>
  </div>
</template>

<script>
  function fileLoader() {
    this.txtFileName = this.$store.state.initFileName
    var txt = FileLookAPI(this.txtFileName)
    txt = marked(txt)
    //改变初始化文件
    this.$store.commit('newFileData',txt)
    if(this.editor) {
      this.editor.txt.html(this.$store.state.initFileData)
    }
  }

  // 引入富文本编辑器
  import E from 'wangeditor'
  import marked from 'marked'
  
  // 引入读写文件api
  import FileLookAPI from './FileLook/FileLookAPI.js'
  export default {
    name: 'FileView',
    data(){
      return {
        txtFileName:''
      }
    },
    components: { 
    },
    computed:{
      listeninitFileName(){
        fileLoader.call(this)
        return this.$store.state.initFileName
      },
      listencountView(){
        if(this.editor) {
          this.editor.$textElem.attr('contenteditable', this.$store.state.countView)
          this.editor.txt.html(this.editor.txt.html())
        }
        return this.$store.state.countView
      }
    },
    watch:{
      listeninitFileName:()=>{
        
      },
      listencountView:()=>{

      }
    },
    mounted() {
      this.editor = new E('.null','.editor')
      this.editor.create()
      this.editor.$textElem.attr('contenteditable', this.$store.state.countView)
      fileLoader.call(this)
      this.$store.commit('newFileCache',this.$store.state.initFileData)
    },
    methods: {
      addEventkey(event){
        this.$store.commit('newFileCache',this.editor.txt.html())
        if(event.keyCode == 27) {
          // 切换编辑模式
          this.$store.dispatch('newCount')
        }
      }
    }
  }
</script>

<style>

</style>
