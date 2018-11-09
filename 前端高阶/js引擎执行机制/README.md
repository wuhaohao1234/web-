# js引擎执行机制

## js是单线程语言

## js的任务队列(Event Loop)

### demo1演示:

```
	console.log(1)       //代码1
	setTimeout(function(){   
		console.log(2)   //代码2
	},0)
	console.log(3)       //代码3

```

- 打印出结果1,3,2

- js任务分类方式:同步任务与异步任务
	![Event] （/Event.png）

	* 同步任务进入主线程
	* 异步任务进入event table待0s后进入event queue
	* 当主线程空闲时，才会把event queue内的任务推入到主线程

- demo1原理
	* console.log(1) 是同步任务，放入主线程里

	* setTimeout() 是异步任务，被放入event table， 0秒之后被推入event queue里

	* console.log(3) 是同步任务，放到主线程里

## 一上对于js的任务队列较笼统，无法解决全部问题

### demo2演示

```
	setTimeout(function(){
	     console.log('定时器开始啦')
	 });
	 console.log('1111')
	 new Promise(function(resolve){
	     console.log('马上执行for循环啦');
	     for(var i = 0; i < 10000; i++){
	         i == 99 && resolve();
	     }
	 }).then(function(){
	     console.log('执行then函数啦')
	 });
	 
	 console.log('代码执行结束');

```

- 打印结果
	11111111111
	马上执行for循环啦
	代码执行结束
	执行then函数啦
	定时器开始啦

## 对于js而言:同步与异步任务的划分并不准确。而准确的任务划分为

* macro-task(宏任务)：包括整体代码script，setTimeout，setInterval

* micro-task(微任务)：Promise，process.nextTick

	* 首先执行script下的宏任务，遇到setTimeout,将其放到宏任务的“队列”里

	* 遇到 new Promise直接执行，打印"马上执行for循环啦"

	* 遇到then方法，是微任务，将其放到微任务的“队列”里。

	* 打印 "代码执行结束"

	* 本轮宏任务执行完毕，查看本轮的微任务，发现有一个then方法里的函数，打印"执行then函数啦"

	* 到此,本轮的event loop 全部完成。

	* 下一轮的循环里，先执行一个宏任务，发现宏任务的“队列”里有一个setTimeout里的函数,执行打印"定时器开始啦"