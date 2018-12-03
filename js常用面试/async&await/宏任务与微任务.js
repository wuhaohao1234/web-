/*
setTimeout(() => {
    console.log('我是异步事件')
}, 0);

console.log('我是同步代码')

先打印出同步，然后是异步的
事件循环机制
*/
setTimeout(() => {
    console.log('我是第一次宏任务里面的异步事件')
}, 0);
new Promise(resolve=>{
    console.log('我是宏任务1')
    resolve('我是微任务')
})
.then(data=>{
    console.log(data)
    setTimeout(() => {
        console.log('我是第二次宏任务里面的异步事件')
    }, 0);
})
.then(() => {
    console.log('data')
})
//代码片段
console.log('我是宏任务')