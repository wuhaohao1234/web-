# js

## 观察者模式Observer

```
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
    // 订阅每次数据修改时，所要发生的函数(渲染数据)
    store.subscribe(() => renderApp())
    //修改数据
    store.dispatch(action)
```

* 关键点:subscribe可以将所要发生函数添加到listeners,每次dispatch的时候都要遍历这个函数

## 双向数据绑定

* 本质与观察者模式类似，但不是观察者模式，是发布订阅模式
`https://blog.csdn.net/qq_39877296/article/details/79103206`


# 观察者模式(redux)

比较概念的解释是，目标和观察者是基类，目标提供维护观察者的一系列方法，观察者提供更新接口。具体观察者和具体目标继承各自的基类，然后具体观察者把自己注册到具体目标里，在具体目标发生变化时候，调度观察者的更新方法。

比如有个“天气中心”的具体目标A，专门监听天气变化，而有个显示天气的界面的观察者B，B就把自己注册到A里，当A触发天气变化，就调度B的更新方法，并带上自己的上下文。


# 发布/订阅模式(双向数据绑定)

比较概念的解释是，订阅者把自己想订阅的事件注册到调度中心，当该事件触发时候，发布者发布该事件到调度中心（顺带上下文），由调度中心统一调度订阅者注册到调度中心的处理代码。

比如有个界面是实时显示天气，它就订阅天气事件（注册到调度中心，包括处理程序），当天气变化时（定时获取数据），就作为发布者发布天气信息到调度中心，调度中心就调度订阅者的天气处理程序。