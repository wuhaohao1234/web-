// 初始化数据
let appState = {
    text:'初始化数据',
    color:'red'
}
// 数据渲染函数
function renderApp() {
    let app = document.getElementById('app')
    app.innerHTML = appState.text
    app.style.color = appState.color
}
// 修改数据函数
function stateChanger(state,action) {
    switch (action.type) {
        case 'UPDATE_TEXT':
            state.text = action.text
            break
        case 'UPDATE_COLOR':
            state.color = action.color
            break
        default:
            break
    }
}
// 观察初始化数据与修改方式
function Observer(state, stateChanger) {
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        stateChanger(state, action)
        listeners.forEach((listener) => listener())
    }
    return { getState, dispatch, subscribe }
}

const store = Observer(appState, stateChanger)
// 订阅每次数据修改时，所要发生的函数
store.subscribe(() => renderApp())

renderApp()
// 修改数据
store.dispatch({ type: 'UPDATE_TEXT', text: '第一次的数据修改' })
store.dispatch({ type: 'UPDATE_TEXT', text: '1231' })
store.dispatch({ type: 'UPDATE_COLOR', color: 'blue' })