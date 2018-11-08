# js执行机制

## 文章地址:https://blog.csdn.net/highboys/article/details/79110116

## js是一门单线程语言

* 问js为毛线是单线程语言

 假设浏览器中的js是多线程的,我一个线程让dom元素删除，另一个线程要捕获该dom元素，然后程序就会出现严重的问题

- 这里先不说web Worker(这玩意根本没法操作dom，但是这玩意还是比较好)

## 同步与异步

* 同步：代码一个一个执行

* 异步：多条代码同时执行(可以先这样理解)

* js为毛线需要异步

 假设js都是同步执行，上面的代码没有解析完成，下面的根本不会有任何作用，很有可能会直接卡死

## js单线程如何实现异步

* 原理:事件循环(event loop)机制(观察demo1.html)

 可以看到setTimeout代码并没有立即执行,而是执行完全局下的console.log才执行setTimeout里面的代码

1. js任务分类的一种方式:同步任务和异步任务

* 首先判断JS是同步还是异步，同步就进入主进程，异步就进入event table

* 异步任务在event table中注册函数，当满足触发条件后，被推入event queue

* 同步任务进入主线程后一直执行，直到主线程空闲时，才会去event queue中查看是否有可执行的异步任务，如果有就推入主进程中


## 事实上，js按照异步和同步的划分方式，并不准确。

### 准确的划分:

* macro-task(宏任务)：包括整体代码script，setTimeout，setInterval

* micro-task(微任务)：Promise，process.nextTick

### JS的执行机制是


