# 动手实现redux

## 准备:在index.html里面修改:

```
  <div id="title"></div>
  <div id="content"></div>
```

## 自定义数据，增加dispath行为

```
  // 数据初始化
  const appState = {
    title:{
      text:'React-redux',
      color:'red'
    },
    content:{
      text:'react-redux内容',
      color:'blue'
    }
  }
  const renderTitle = (title)=>{
    const titleDom = document.getElementById('title')
    titleDom.innerHTML = title.text
    titleDom.style.color = title.color
  }
  const renderContent = (content)=>{
    const contentDom = document.getElementById('content')
    contentDom.innerHTML = content.text
    contentDom.style.color = content.color
  }
  const renderApp = (appState)=>{
    renderTitle(appState.title)
    renderContent(appState.content)
  }
  // 数据第一次挂载
  renderApp(appState)

  const dispatch = (action)=> {
    switch (action.type) {
      case 'UPDATE_TITLE_TEXT':
        appState.title.text = action.text
        break
      case 'UPDATE_TITLE_COLOR':
        appState.title.color = action.color
        break
      case 'UPdATE_CONTENT_TEXT':
        appState.content.text = action.text
      case 'UPdATE_CONTENT_COLOR':
        appState.content.color = action.color
      default:
        break
    }
  }
  // 数据修改
  dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
  dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
  // 数据第二次挂在
  setTimeout(()=>{
    renderApp(appState)
  },1000)
```
## 抽离 store 和监控数据变化

```
let appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

const renderTitle = (title)=>{
  const titleDom = document.getElementById('title')
  titleDom.innerHTML = title.text
  titleDom.style.color = title.color
}
const renderContent = (content)=>{
  const contentDom = document.getElementById('content')
  contentDom.innerHTML = content.text
  contentDom.style.color = content.color
}

const renderApp = (appState)=>{
  renderTitle(appState.title)
  renderContent(appState.content)
}
const stateChanger = (state, action)=> {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color
      break
    default:
      break
  }
}
const createStore = (state,stateChanger)=>{
  const listeners = []
  const subscribe = (listener)=>listeners.push(listener)
  const getState = ()=>state
  const dispatch = (action)=>{
    stateChanger(state,action)
    listeners.forEach((listener)=>listener())
  }
  return {getState,dispatch,subscribe}
}

const store = createStore(appState, stateChanger)

store.subscribe(() => renderApp(store.getState()))

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色

```

* 剩余参考redux小书http://huziketang.mangojuice.top/books/react/
