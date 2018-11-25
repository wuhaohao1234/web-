<template>
  <div>
    <!-- 文件区域 -->
    <div class="file">
      <div class="left">
        <FileDirectory></FileDirectory> 
      </div>
      <div class="right">
        <FileView></FileView>
      </div>  
    </div>
    <!-- 命令行区域 -->
    <div class="bottom">
      <Command/>
    </div>

  </div>
</template>

<script>
  import FileDirectory from './FileDirectory'
  import FileView from './FileView'
  import Command from './Command'
  
  export default {
    name: 'landing-page',
    components: { 
      FileDirectory,
      FileView,
      Command
    }
  }
</script>

<style>
.file{
  width:100%;
  height:500px;
}
.bottom{
  height:30px;
}
.left{
  width:30%;
  box-sizing:border-box;
  border-right:1px solid #000;
}
.right{
  width:70%;
}
.left,.right{
  float:left;
  height:100%;
}
</style>
