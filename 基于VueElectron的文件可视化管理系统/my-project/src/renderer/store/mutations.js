const mutations = {
    newCount(state){
        state.countView = !state.countView
    },
    newFile(state,value){
        state.initFileName = value
    },
    newFileData: (state, data) => {
        state.initFileData = data
    },
    newFileCache:(state,data) =>{
        state.initFileCache = data
    }
}
export default mutations