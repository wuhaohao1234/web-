<template>
  <div class="commandFile" >
    <div class="tipsCope" >
      <span>
        未命名
      </span>
      <span class="filetTip" >
        编码状态
          &nbsp;&nbsp;&nbsp;
        第多少行代码
      </span>
    </div>
    <input v-on:keyup="Commando" type="text" ref="input" >
  </div>
</template>

<script>
  import commandEvent from './commandEvent/commandEvent.js'
  export default {
    name: 'Command',
    data(){
      return {
        promptStr:''
      }
    },
    mounted(){
      if(!this.$store.state.countView) {
        this.$refs['input'].focus();
      }
    },
    components: { 
    },
    computed:{
      listencountView(){
        if(!this.$store.state.countView && this.$refs['input']) {
          this.$refs['input'].value = ''
          this.$refs['input'].focus();
        }
        return this.$store.state.countView
      }
    },
    watch:{
      listencountView:()=>{

      }
    },
    methods: {
      Commando(event){
        let value = this.$refs['input'].value
        if(event.keyCode === 73&&value.length === 1) {
          this.$store.dispatch('newCount')
        }
        if(event.keyCode === 13) {
          new commandEvent(this.$refs['input'],this.$store,this.$refs['input'].value)
        }
      }
    }
  }
</script>

<style scoped >
.commandFile{
  overflow:hidden;
}
.commandFile input{
  display:block;
  width:100%;
  padding:0 30px;
  font-size:20px;
  color:#f60;
  height:30px;
  background:#000;
  line-height:30px;
}
.tipsCope{
  height:18px;
  background:rgba(0,0,0,.5);
  padding:0 30px;
  margin-bottom:4px;
}
.filetTip{
  float:right;
}
</style>
