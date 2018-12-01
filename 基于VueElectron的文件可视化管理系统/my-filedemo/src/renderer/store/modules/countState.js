const state = {
    count:false
}

const mutations = {
    newCount(state){
        state.count = !state.count
    }
}

const actions = {
    newCount({ commit }) {
        commit('newCount')
    }
}

export default {
    state,
    mutations,
    actions
}
