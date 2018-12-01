const state = {
    file: `
        <h2>
            我是初始化文件内容
        </h2>
    `
}

const mutations = {
    newShowFile(state, newFile) {
        state.file = newFile
    }
}

const actions = {
    newShowFile({ commit }) {
        commit('newShowFile')
    }
}

export default {
    state,
    mutations,
    actions
}
