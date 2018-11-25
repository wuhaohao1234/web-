<template>
  <div>
    <h3>
      {{fileChildren.name}}
    </h3>
    <ul v-for="item in fileChildren.children" >
      <li v-if="item.type === 'file'" >*{{item.name}}</li>
      <li v-if="item.type === 'folder'" >={{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import FileLookAPI from "./FileLook/FileLookAPI.js";
export default {
  name: "FileDirectory",
  data() {
    return {
      fileChildren:{
      }
    };
  },
  components: {},
  methods: {},
  mounted() {
    var txt = FileLookAPI("/db.json");
    this.fileChildren = JSON.parse(txt)
  }
};
</script>

<style scoped >
  li{
    list-style: none;
    margin-left: 20px;
  }
</style>