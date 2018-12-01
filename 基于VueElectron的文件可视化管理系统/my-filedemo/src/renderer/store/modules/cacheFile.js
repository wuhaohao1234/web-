const state = {
    fileCache: ``
}

const mutations = {
    newFileCache(state, newFileCache) {
        state.fileCache = newFileCache
    }
}

const actions = {
    newFileCache({ commit },str) {
        commit('newFileCache',str)
    }
}

export default {
    state,
    mutations,
    actions
}
