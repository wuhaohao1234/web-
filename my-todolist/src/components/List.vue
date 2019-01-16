<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
            <v-divider></v-divider>
            <v-list
                subheader
                two-line
                v-for="(item,key) in UserDate"
            >
            <v-list-tile>
                <!-- 修改任务是否完成 -->
            <v-list-tile-action @click="changTask(key)" >
                <v-checkbox></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>{{item.task}}</v-list-tile-title>
            </v-list-tile-content>            
            <!-- 修改任务内容 -->
            <v-list-tile-action @click="changShow(item.id)" >
                <v-icon :color="item.tasked ? 'teal' : 'grey'">more_vert</v-icon>
            </v-list-tile-action>
            </v-list-tile>
        </v-list>
        </v-card>
        <v-btn
            color="cyan"
            dark
            big
            absolute
            bottom
            right
            fab
            @click="addDate()"
        >
        <!-- 添加任务 -->
            <v-icon>add</v-icon>
        </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    computed:{
      UserDate() {
          return this.$store.state.UserDate
      }
    },
    methods:{
        addDate() {
            let i = this.$store.state.UserDate.length
            this.$store.dispatch('addDate',{
                id:i,
                task:'第4个任务',
                tasked:false
            })
        },
        changTask(key) {
            this.$store.dispatch('changTask',key)
        },
        changShow(key) {
            this.$store.dispatch('changShow',key)
        }
    }
}
</script>