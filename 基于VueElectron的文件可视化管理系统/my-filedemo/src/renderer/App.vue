<template>
  <div id="app">
    <div class="box">
      <div class="FileDirectory">
        <FileDirectory></FileDirectory>
      </div> 
      <div class="FileView">
        <FileView></FileView>
      </div>
    </div>
    <div class="Command">
      <Command></Command>
    </div>
  </div>
</template>

<script>
import FileDirectory from './components/FileDirectory/'
import FileView from './components/FileView/'
import Command from './components/Command/'
export default {
  name: "my-filedemo",
  components: {
    FileDirectory,
    FileView,
    Command
  }
};
</script>

<style>
  #app{
    width: 100%;
    height: 100%;
    background: rgba(192,249,19,0.3);
  }
  .box{
    height: 80%;
  }
  .FileDirectory{
    width: 25%;
    height: 100%;
    float: left;
  }
  .FileView{
    width: 75%;
    height: 100%;
    float: left;
  }
  .Command{
    width: 100%;
    height: 20%;
  }
</style>
