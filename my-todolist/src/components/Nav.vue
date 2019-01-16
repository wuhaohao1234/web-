<template>
  <v-toolbar  dark>
    <v-container grid-list-md text-xs-center>
      <v-toolbar-title >{{tasking}}个任务{{tasked}}已完成</v-toolbar-title>
    </v-container>
  </v-toolbar>
</template>
<script>
export default {
  computed: {
    tasked() {
      let len = 0
      for(var i = 0;i < this.$store.state.UserDate.length;i ++) {
        if(this.$store.state.UserDate[i].tasked) {
          len ++
        }
      }
      // 遍历UserDate[i]中的tasked
      return len; //完成数目
    },
    tasking() {
      return this.$store.state.UserDate.length //任务数
    }
  }
};
</script>
