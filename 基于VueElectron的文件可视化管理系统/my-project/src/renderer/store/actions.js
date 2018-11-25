const actions = {
    newCount:({commit})=>{
        commit('newCount')
    },
    newFile:({commit},value)=>{
        commit('newFile',value)
    }
}
export default actions