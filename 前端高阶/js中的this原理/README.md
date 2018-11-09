# js中的this原理

## 教科书:this指向它所处的环境/调用者

```
	var obj = {
	  foo: function () { console.log(this.bar) },
	  bar: 1
	};

	var foo = obj.foo;
	var bar = 2;

	obj.foo() // 调用者为obj为1
	foo() // 调用者为window为2

```

## 原理:解释为什么this指向它所处的环境/调用者

### js中的内存结构

`var obj = { foo:  5 };`

* 在栈中声明一个地址为obj。obj指向的是堆内存中的foo=5,obj.foo的值为5

### 函数

`var obj = { foo: function () {} };`

* 在栈中声明一个地址为obj。obj指向的是堆内存中的foo，但是这个foo可以说是一个函数的地址，并且这个函数是在栈内存中。这个函数是一个单独的值，所以它可以在不同的环境（上下文）执行。

```
	var f = function () {};
	var obj = { f: f };

	// 单独执行
	f()

	// obj 环境执行
	obj.f()

```

### 环境变量

* JavaScript 允许在函数体内部，引用当前环境的其他变量。

- 现在问题就来了，由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境。