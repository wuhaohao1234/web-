# js实现深浅拷贝

## 等号赋值

## Object.assign()
	Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。但是 Object.assign() 进行的是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身。
```
	var obj = { a: {a: "hello", b: 21} };
	var initalObj = Object.assign({}, obj);

	initalObj.a.a = "changed";
	console.log(obj.a.a); // "changed"
```

## 深拷贝

### 手动赋值
```
	var obj1 = { a: 10, b: 20, c: 30 };
	var obj2 = { a: obj1.a, b: obj1.b, c: obj1.c };
	obj2.b = 100;
	console.log(obj1);
	// { a: 10, b: 20, c: 30 } <-- 沒被改到
	console.log(obj2);
	// { a: 10, b: 100, c: 30 }
```
### JSON做字符串转换

* function没法转JSON

```
	var obj1 = { body: { a: 10 } };
	var obj2 = JSON.parse(JSON.stringify(obj1));
	obj2.body.a = 20;
	console.log(obj1);
	// { body: { a: 10 } } <-- 沒被改到
	console.log(obj2);
	// { body: { a: 20 } }
	console.log(obj1 === obj2);
	// false
	console.log(obj1.body === obj2.body);
	// false
```

### 递归拷贝

```
	function deepClone(initalObj, finalObj) {    
	  var obj = finalObj || {};    
	  for (var i in initalObj) {        
	    var prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
	    if(prop === obj) {            
	      continue;
	    }        
	    if (typeof prop === 'object') {
	      obj[i] = (prop.constructor === Array) ? [] : {};            
	      arguments.callee(prop, obj[i]);
	      // deepClone(prop, obj[i])
	    } else {
	      obj[i] = prop;
	    }
	  }    
	  return obj;
	}

	var str = {};
	var obj = { a: {a: "hello", b: 21} };
	deepClone(obj, str);
	console.log(str.a);
```
### Object.create()方法

* 直接使用var newObj = Object.create(oldObj)，可以达到深拷贝的效果。

```
	function deepClone(initalObj, finalObj) {    
	  var obj = finalObj || {};    
	  for (var i in initalObj) {        
	    var prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
	    if(prop === obj) {            
	      continue;
	    }        
	    if (typeof prop === 'object') {
	      obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
	    } else {
	      obj[i] = prop;
	    }
	  }    
	  return obj;
	}
```

### jquery.extends方法

```
	var $ = require('jquery');
	var obj1 = {
	    a: 1,
	    b: { f: { g: 1 } },
	    c: [1, 2, 3]
	};
	var obj2 = $.extend(true, {}, obj1);
	console.log(obj1.b.f === obj2.b.f);
	// false
```