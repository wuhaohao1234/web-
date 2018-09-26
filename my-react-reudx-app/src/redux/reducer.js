const reducer = (state={
  text : '你好!访问者',
  name : '访问者'
},action)=>{
  switch (action.type){
    case 'change':
      return {
        name:action.payload,
        text:'您好'+ action.payload
      }
    default:
      return state
  }
}
export default reducer
