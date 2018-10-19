<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="myDate" >
    {{myDate}}
    <button @click="myClick" >点击我</button>
    <hr>
    <ul>
      <li v-for="item in myDateArr" v-bind:key ="item.text" >
        {{item.text}}
      </li>
    </ul> 
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  myDate:string = '吴昊'
  myDateArr = [
    {text:'第一组数据'},
    {text:'第二组数据'},
    {text:'第三组数据'},
    {text:'第四组数据'},
    {text:'第五组数据'},
  ]
  myClick() {
    console.log(this.myDate)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
