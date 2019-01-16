import Vue from "vue";
import Vuex from "vuex";
import _ from 'lodash'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    show:false,
    current:0,
    UserDate: [
      {
        id: 0,
        task: '第一个任务',
        tasked: false
      },
      {
        id: 1,
        task: '第一个任务',
        tasked: false
      },
      {
        id: 2,
        task: '第一个任务',
        tasked: false
      }
    ]
  },
  mutations: {
    // 添加
    addDate(state, newDate) {
      state.UserDate.push(newDate)
    },
    // 修改内容
    changDate(state, tasks) {
      console.log(tasks)
      state.UserDate[tasks.id].task = tasks.task
    },
    // 删除
    deleteDate(state, key) {
      console.log(key)
      state.UserDate = _.reject(state.UserDate, ['id', key])
    },
    // 完成状态
    changTask(state,key) {
      state.UserDate[key].tasked = !state.UserDate[key].tasked
    },
    // 提示框显示
    changShow(state,key) {
      state.show = !state.show
      state.current = key
    }
  },
  actions: {
    addDate(context, newDate) {
      context.commit('addDate', newDate)
    },
    changDate(context, tasks) {
      context.commit('changDate', tasks)
    },
    deleteDate(context, key) {
      context.commit('deleteDate', key)
    },
    changTask(context,key) {
      context.commit('changTask', key)
    },
    changShow(context,key) {
      context.commit('changShow',key)
    }
  }
});
