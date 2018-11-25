<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'my-project'
  }
</script>

<style>
  *{
  	margin:0;
  	padding:0;
  }
  html,body{
    width:100%;
    height:100%;
  }
  body{
    height:100%;
  	background:rgba(192,249,19,0.3);
  }
</style>
