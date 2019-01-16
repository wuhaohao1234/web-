<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="show"
      width="500"
    >
      <v-card>  
          <v-toolbar-title  class="dark" dark >Message Board</v-toolbar-title>
          </v-toolbar>
        <v-card-text>
          <v-flex>
            <v-textarea
              box
              name="input-7-4"
              label="Box textarea"
              v-model = "str"
              height="100"
            ></v-textarea>
          </v-flex>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="deleteDate()"
          >
            删除任务
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="changDate()"
          >
            保存任务
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
<script>
  export default {
    computed:{
      show() {
          return this.$store.state.show
      }
    },
    data() {
      return {
        str:this.$store.state.UserDate[this.$store.state.current].task
      }
    },
    methods:{
      deleteDate() {
        // 删除
        this.$store.dispatch('deleteDate',this.$store.state.current)
        // 退出
        this.$store.dispatch('changShow',this.$store.state.current)
      },
      changDate() {
        this.$store.dispatch('changDate',{
          id:this.$store.state.current,
          task:this.str
        })
        this.$store.dispatch('changShow',this.$store.state.current)
      }
    }
  }
</script>