const state = {
    fileName:'help.md',
    dbFile:[
        {
            fileName:'help.md',
            type:'file'
        }
    ]
}

const mutations = {
    newFileName(state,newName){
        state.fileName = newName
    },
    newDbFile(state,newFile) {
        state.dbFile.push(newFile)
    },
    changeDbFile(state,newFile){
        //这里只需要改变引用
        state.dbFile = newFile
    }
}

const actions = {
    newFileName({commit},newName){
        commit('newFileName', newName)
    },
    newDbFile({commit},newName) {
        commit('newDbFile', newName)
    },
    changeDbFile({ commit }, newName) {
        commit('changeDbFile', newName)
    }
}

export default {
    state,
    mutations,
    actions
}
