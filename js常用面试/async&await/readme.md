# async&await

## async异步函数(微任务函数)

* 原理：async函数，它是返回一个promise对象。我们可以通过then函数调用这个返回值(宏任务，微任务)
宏任务:代码片段，setTimeout,setInterval
微任务:Promise
```
    //最简单的同步代码
    function fn(){
        return '我是同步的，我会阻塞下面代码的运行'
    }
    // fn会阻塞下面代码的运行
    console.log(fn())

    console.log('我被阻塞')
    // 异步代码async
    async function fn() {
        if(true){
            return '我是成功的,我不会阻塞下面代码的运行'
        }
    }
    fn().then(data=>console.log(data))
    console.log('我不会被阻塞')
```

## await

* await:等待的意思,等待promise中的resolve函数执行完毕的时候

* 写await必须要保障这个函数是异步的async

* 解决的问题就是读取异步promise信息