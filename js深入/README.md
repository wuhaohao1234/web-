# js深入

## 从原型到原型链

* 每一个构造函数都含有prototype属性，同样还有constructor属性

* 构造函数的prototype指向它的原型，原型的constructor指向构造函数

* 当构造函数使用new运算符构造出个实例的时候，这个实例可以访问这个构造函数原型上的属性

```
function Person() {

}
Person.prototype.name = 'jack'
var person1 = new Person()
var person2 = new Person()
console.log(person1.name === person2.name ) //true
console.log(person1.__proto__===Person.prototype) //true
console.log(Person.prototype.constructor === Person) //true

```
## 深入之词法作用域和动态作用域

* 在bar中首先打印出value,这里因为bar函数中已经定义并赋值了value，打印出结果为2
  然后执行全局下的foo函数，全局下的foo函数由于没有自定义value,所以只能找全局下的value=1

```
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  console.log(value)
  foo();
}

bar();//1

```
## 深入之执行上下文栈


```
function foo() {
    console.log('foo1');
}
foo();  // foo2
function foo() {
    console.log('foo2');
}
foo(); // foo2
```
* js引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文

```
ECStack = [];
```

* 在js解析执行代码的时候，首先遇到全局代码，先向执行上下文压入全局代码(globalContext)

```
ECStack = [
    globalContext
];
```
```
function fun3() {
    console.log('fun3')
}
function fun2() {
    fun3();
}
function fun1() {
    fun2();
}
fun1();
```
* 当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。

```
  // 伪代码

  // fun1()
  ECStack.push(<fun1> functionContext);

  // fun1中竟然调用了fun2，还要创建fun2的执行上下文
  ECStack.push(<fun2> functionContext);

  // 擦，fun2还调用了fun3！
  ECStack.push(<fun3> functionContext);

  // fun3执行完毕
  ECStack.pop();

  // fun2执行完毕
  ECStack.pop();

  // fun1执行完毕
  ECStack.pop();

  // javascript接着执行下面的代码，但是ECStack底层永远有个globalContext

```

* 这里还有一种解释:js解析代码的时候：首先遇到全局状态下的function
  globalContext里面会首先定义这3个函数，但是还没有执行，压根不知道函数里面做了什么事情。
  然后会首先执行fun1，由于发现里面调用了全局下的fun2,执行全局下的fun2，由于里面调用了全局下的fun3，最后执行全局下的fun3

## 深入之变量对象

* 在全局下调用this，这里this是window
```
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};
  b = 3;
}
foo(1);
```
* 在进入执行上下文后，这时候的 AO 是：
```
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}
```
* 执行的时候：
```
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```

## this指向

* 不管什么情况下this都指向调用者

```
  //button是按钮
  function Person(){

  }
  Person.prototype.fun = function() {
    console.log(this)
  }
  var person = new Person()
  button.onclick = person.fun
  //这里是按钮点击事件调用了person.fun这个函数，this指向按钮
```
```
  button.onclick = function(){
    console.log(this)//这里this指向调用者button
    person.fun()//这里this指向调用者Person
  }

* 这里要注意一点:button调用了匿名函数function，然而匿名函数调用了全局下的person，person调用了person.__proto__也就是Person.prototype的fun，所以this指向Person

```
## 闭包
###ECMAScript中，闭包指的是：

  从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
  从实践角度：以下函数才算是闭包：
  即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
  在代码中引用了自由变量
```
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();

```
* 以上结果全部为3，在调用之前data[i]里面的i是全局变量，i经过for循环后，i变为3

* data[i]是个函数，调用全局变量的i，构成闭包，i为3

* 修改:

```
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function(i){
    return function abc(){
      console.log(i)
    }
  })(i)
}
data[0]()
data[1]()
data[2]()
```
* 在这里data[i]是一个匿名函数执行后返回的一个abc(也可以是一个匿名函数)
  这个匿名函数每次执行的时候接受一个参数i，这个i同样是全局变量里面的i,但是i并没有循环,而是每次被当作参数传递给匿名函数执行，然后再循环
  匿名函数返回的函数abc可以接受匿名函数的ao，ao里面的i是作为参数传递过来的

## call和apply

```
var foo = {
  value: 1
};

function bar() {
  console.log(this.value);
}

bar.call(foo); // 1
```

* 这里通过call的方式改变了bar里面的this指向，bar原来的this是指window,但是变为了foo这个对象

### 尝试实现call

```
  // 第一版
  Function.prototype.call2 = function(context) {
      // 首先要获取调用call的函数，用this可以获取
      context.fn = this;
      context.fn();
      delete context.fn;
  }

  // 测试一下
  var foo = {
      value: 1
  };

  function bar() {
      console.log(this.value);
  }

  bar.call2(foo); // 1
```
* 在这里给Function.prototype新增一个call2的方法，这个方法接受一个对象context。

* call2里面的this是指调用者bar。context.fn = this，然后执行context.fn。这里context.fn内部this指向就变为context。最后删除context.fn这个方法

## bind的模拟实现

* 返回一个函数,可以传入参数,bind与call区别是，call会里面执行，bind不会执行

```
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

// 返回了一个函数
var bindFoo = bar.bind(foo);

bindFoo(); // 1

```

### 实现bind方法

```
Function.prototype.bind2 = function (context) {
  var self = this;
  return function () {
      return self.call(context);
  }
}
```

## js继承

### 原型链继承

```
  function Parent () {
    this.name = 'kevin';
  }

  Parent.prototype.getName = function () {
    console.log(this.name);
  }

  function Child () {

  }

  Child.prototype = new Parent();

  var child1 = new Child();

  child1.getName() // kevin
```
* 问题:引用类型的属性被所有实例共享，任意实例都可以修改原型上的属性

### 借用构造函数(经典继承)

```
  function Parent () {
      this.names = ['kevin', 'daisy'];
  }

  function Child () {
      Parent.call(this);
  }

  var child1 = new Child();

  child1.names.push('yayu');

  console.log(child1.names); // ["kevin", "daisy", "yayu"]

  var child2 = new Child();

  console.log(child2.names); // ["kevin", "daisy"]
```
* 问题:方法都在构造函数中定义，每次创建实例都会创建一遍方法。消耗内存

### 组合式继承
```
  function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
  }

  Parent.prototype.getName = function () {
      console.log(this.name)
  }

  function Child (name, age) {
      Parent.call(this, name);
      this.age = age;
  }

  Child.prototype = new Parent();
  Child.prototype.constructor = Child;

  var child1 = new Child('kevin', '18');

  child1.colors.push('black');

  console.log(child1.name); // kevin
  console.log(child1.age); // 18
  console.log(child1.colors); // ["red", "blue", "green", "black"]

  var child2 = new Child('daisy', '20');

  console.log(child2.name); // daisy
  console.log(child2.age); // 20
  console.log(child2.colors); // ["red", "blue", "green"]
```
* 融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

# Underscore

## 防抖

* 在开发中当用户频繁触发事件的时候，例如点击按钮向服务器发送ajax,页面动画，这样对于性能会产生很大影响，所以出现了防抖

```
  let debounce = (fun,wait)=>{
    let timeout;
    return ()=>{
      clearTimeout(timeout)
      timeout = setTimeout(fun,wait);
    }
  }

```

* 通过一个定时器延迟一段时间执行该函数

- 完整版:

```
  function debounce(func, wait, immediate) {

      var timeout;

      return function () {
          var context = this;
          var args = arguments;

          if (timeout) clearTimeout(timeout);
          if (immediate) {
              // 如果已经执行过，不再执行
              var callNow = !timeout;
              timeout = setTimeout(function(){
                  timeout = null;
              }, wait)
              if (callNow) func.apply(context, args)
          }
          else {
              timeout = setTimeout(function(){
                  func.apply(context, args)
              }, wait);
          }
      }
  }
```

## 节流

* 持续触发事件，每隔一段时间，只执行一次事件。根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。

```
  function throttle(func, wait) {
      var context, args;
      var previous = 0;

      return function() {
          var now = +new Date();
          context = this;
          args = arguments;
          if (now - previous > wait) {
              func.apply(context, args);
              previous = now;
          }
      }
  }

```

## 数组去重

```
  let arr = [1, 1, '1', '1'];
  let unique = (array)=>{
    let res = [],i,j=0;
    for(i = 0,arrayLen = array.length;i < arrayLen;i ++) {
      for(j,resLen = res.length;j < resLen;j ++) {
        if(array[i] === res[j]){
          break;
        }
      }
      if(j === resLen) {
        res.push(array[i])
      }
    }
    return res
  }
  console.log(unique(arr))

```

### es6

```
  let unique = (a) => [...new Set(a)]
```

## 深浅拷贝
<!-- 浅拷贝 -->
```

  var arr = ['old', 1, true, null, undefined];

  var new_arr = arr.concat();

  new_arr[0] = 'new';

  console.log(arr) // ["old", 1, true, null, undefined]
  console.log(new_arr) // ["new", 1, true, null, undefined]
```
<!-- 深拷贝 -->

```
  var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]

  var new_arr = JSON.parse( JSON.stringify(arr) );

  console.log(new_arr);
```

### 实现方法:

* 浅拷贝:遍历对象，然后把属性和属性值都放在一个新的对象
```
  var shallowCopy = function(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
  }
```
* 深拷贝:遍历对象,判断对象的属性值，看它是否是对象，如果是递归调用深拷贝函数
```
  var deepCopy = function(obj) {
      if (typeof obj !== 'object') return;
      var newObj = obj instanceof Array ? [] : {};
      for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
              newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
          }
      }
      return newObj;
  }
```

## 从零实现jQuery的extend

```
  jQuery.extend( target [, object1 ] [, objectN ] )
```
```
  var obj1 = {
      a: 1,
      b: { b1: 1, b2: 2 }
  };

  var obj2 = {
      b: { b1: 3, b3: 4 },
      c: 3
  };

  var obj3 = {
      d: 4
  }

  console.log($.extend(obj1, obj2, obj3));
```

* 将obj1,obj2,obj3全部合并到一个个对象当中，会覆盖
<!-- 浅拷贝 -->
```
  function extend(){
    let name,options,copy
    let i = 1;
    let target = arguments[0]
    for(;i < arguments.length;i ++) {
      options = arguments[i]
      if(options != null){
        for(name in options) {
          copy = options[name]
          if(copy != undefined) {
            target[name] = copy
          }
        }
      }
    }
    return target
  }
```
<!-- 深拷贝 -->
```
  function extend() {
    // 默认不进行深拷贝
    var deep = false;
    var name, options, src, copy;
    var length = arguments.length;
    // 记录要复制的对象的下标
    var i = 1;
    // 第一个参数不传布尔值的情况下，target默认是第一个参数
    var target = arguments[0] || {};
    // 如果第一个参数是布尔值，第二个参数是才是target
    if (typeof target == 'boolean') {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    // 如果target不是对象，我们是无法进行复制的，所以设为{}
    if (typeof target !== 'object') {
        target = {}
    }

    // 循环遍历要复制的对象们
    for (; i < length; i++) {
        // 获取当前对象
        options = arguments[i];
        // 要求不能为空 避免extend(a,,b)这种情况
        if (options != null) {
            for (name in options) {
                // 目标属性值
                src = target[name];
                // 要复制的对象的属性值
                copy = options[name];

                if (deep && copy && typeof copy == 'object') {
                    // 递归调用
                    target[name] = extend(deep, src, copy);
                }
                else if (copy !== undefined){
                    target[name] = copy;
                }
            }
        }
    }

    return target;
  };
```
