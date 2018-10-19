# js事件详解

## 事件循环
  JavaScript引擎并不是独立运行的，它运行在宿主环境中，对多数开发者来说通常就是Web浏览器。经过最近几年的发展，JavaScript已经超出了浏览器的范围，进入了其他环境，比如通过像Node.js这样的工具进入服务器领域。实际上，JavaScript现如今已经嵌入到了从机器人到电灯泡等各种各样的设备中。
  所有这些环境都有一个共同“点”，即它们都提供了一种机制来处理程序中多个块的执行，且执行每块时调用JavaScript引擎，这种机制被称为事件循环。
  换句话说，JavaScript引擎本身并没有时间的概念，只是一个按需执行JavaScript任意代码片段的环境。“事件”（JavaScript代码执行）调度总是由包含它的环境进行。

## JS引擎的两大特点：单线程和非阻塞

### 单线程

  JS引擎是基于单线程(Single-threaded)事件循环的概念构建的。同一时刻只运行一个代码块在执行，与之相反的是像JAVA和C++一样的语言，它们允许多个不同的代码块同时执行。对于基于线程的软件而言，当多个代码块同时访问并改变状态时，程序很难维护并保证状态不出错。

### 非阻塞
  非阻塞则是当代码需要进行一项异步任务（无法立刻返回结果，需要花一定时间才能返回的任务，如I/O事件）的时候，主线程会挂起（pending）这个任务，然后在异步任务返回结果的时候再根据一定规则去执行相应的回调。非阻塞是通过事件循环机制实现的。
  JS通常是非阻塞的，除了某些特殊情况，JS会停止代码执行：
- alert, confirm, prompt（除了Opera）
- “页面上的程序正忙”的系统对话框弹出

## 同步与异步

### 异步编程模型
  包括事件模型，回调模式，Promise异步操作结果占位符。
  事件模型会在触发事件后向任务队列中添加事件处理程序，但是只有当其前面的任务都完成后它才会执行。
  回调模式和事件模型类似，异步代码都会在未来某个事件点执行，但是不同在于回调模型中被调用的回调函数是作为参数传入的，而且可以使用回调模式链接多个调用，也就是也嵌套的方式调用回调函数，但是这种方式的问题是会陷入“回调地狱”，嵌套的代码难以理解并难以维护。
  Promise不会订阅一个事件或是传递回调函数给目标函数，而是让函数返回一个Promise对象。Promise有三种状态，保存在其内部属性中，分别是”pending”（进行中）、fulfilled（已完成）、rejected（已拒绝）。通过为执行器函数分别指定resolve和reject函数可以在执行器完成时（fulfilled或rejected）调用相应的函数。

## 执行栈与任务队列
  调用栈中遇到DOM操作、ajax请求以及setTimeout等WebAPIs的时候就会交给浏览器内核的其他模块进行处理，webkit内核在Javasctipt执行引擎之外，有一个重要的模块是webcore模块。对于图中WebAPIs提到的三种API，webcore分别提供了DOM Binding、network、timer模块来处理底层实现。等到这些模块处理完这些操作的时候将回调函数放入任务队列中，之后等栈中的task执行完之后再去执行任务队列之中的回调函数。
### 执行栈
```
function foo(b) {
  var a = 10;
  return a + b + 11;
}

function bar(x) {
  var y = 3;
  return foo(x * y);
}

console.log(bar(7));
```
  调用bar时，创建了第一个帧 ，帧中包含了bar的参数和局部变量。当bar调用foo时，第二个帧就被创建，并被压到第一个帧之上，帧中包含了foo的参数和局部变量。当foo返回时，最上层的帧就被弹出栈（剩下bar函数的调用帧 ）。当bar返回的时候，栈就是空的。以上都是同步代码的执行。

###  任务队列
    一个 JavaScript 运行时包含了一个待处理的消息队列。每一个消息都与一个函数相关联。当栈拥有足够内存时，从队列中取出一个消息进行处理。这个处理过程包含了调用与这个消息相关联的函数（以及因而创建了一个初始堆栈帧）。当栈再次为空的时候，也就意味着消息处理结束。
----------------------------------------------------------------------
    macro-task宏观任务队列包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。
    micro-task微观任务队列包括：process.nextTick, Promises, Object.observe, MutationObserver,MessageChannel

## Promise:



```
(function test() {
    setTimeout(function() {console.log(4)}, 0);
    new Promise(function executor(resolve) {
        console.log(1);
        for( var i=0 ; i<10000 ; i++ ) {
            i == 9999 && resolve();
        }
        console.log(2);
    }).then(function() {
        console.log(5);
    });
    console.log(3);
})();
//打印结果:1,2,3,5,4
```
* 先执行log(1),然后是log2。then方法在log3以后执行,然后log5,最后log4
