# js面向对象编程

## Javascript 面向对象编程（一）：封装

### 一、 生成实例对象的原始模式

- 特点:写起来麻烦，实例与原型没有关系

```
  var car = {
    name : '',
    color : ''
  }
  var car1 = {}
    car1.name = 'jack'
    car1.color = 'yellow'
  var car2 = {}
    car2.name = 'arf'
    car2.color = 'red'
```
### 二、 原始模式的改进

- 特点:写起来简单，解决代码重复，但是cat1与cat2没有关系

```
  function Cat(name,color) {
    return {
      name:name,
      color:color
    }
  }
  var cat1 = Cat("大毛","黄色");

　var cat2 = Cat("二毛","黑色");

```
### 三、 构造函数模式

- 特点:cat1与cat2都是Cat的实例，但是属性没办法公用，及其消耗内存
*
  为了解决从原型对象生成实例的问题，Javascript提供了一个构造函数（Constructor）模式。

  所谓"构造函数"，其实就是一个普通函数，但是内部使用了this变量。对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。


```
  function Cat(name,color){
    this.name=name;
　　this.color=color;
　}
  var cat1 = new Cat("大毛","黄色");
  var cat2 = new Cat("二毛","黑色");
  alert(cat1.name); // 大毛
  alert(cat1.color); // 黄色

  alert(cat1.constructor == Cat); //true
  alert(cat2.constructor == Cat); //true

  alert(cat1 instanceof Cat); //true
　alert(cat2 instanceof Cat); //true
```

### 四、 Prototype模式

- 特点:不占用内存，相同的属性与方法公用(完美)

```
  function Cat(name,color){
    this.name = name;
    this.color = color;
  }
  Cat.prototype.type = "猫科动物";
  Cat.prototype.eat = function(){alert("吃老鼠")};

  var cat1 = new Cat("大毛","黄色");

  var cat2 = new Cat("二毛","黑色");

  alert(cat1.eat == cat2.eat); //true

```

## Javascript面向对象编程（二）：构造函数的继承

```
  function Animal(){
  　this.species = "动物";
  }  

  function Cat(name,color){
    this.name = name;
    this.color = color;
　}

```

### 构造函数绑定

```
function Cat(name,color){
  Animal.apply(this, arguments);
  this.name = name;
  this.color = color;
}
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物

```

### prototype

* 这里一定要写Cat.prototype.constructor = Cat;，不然Cat的constructor僵尸Animal

```
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```

### 直接继承prototype

* 这样做的方法会导致直接修改Animal的constructor

```
  function Animal(){ }
  Animal.prototype.species = "动物";
  Cat.prototype = Animal.prototype;
  Cat.prototype.constructor = Cat;
  var cat1 = new Cat("大毛","黄色");
  alert(cat1.species); // 动物

```

### 拷贝继承

```
  function Animal(){}

  Animal.prototype.species = "动物";
  function extend2(Child, Parent) {

　　　　var p = Parent.prototype;

　　　　var c = Child.prototype;

　　　　for (var i in p) {

　　　　　　c[i] = p[i];

　　　　　　}

　　　　c.uber = p;

　　}
    extend2(Cat, Animal);

　　var cat1 = new Cat("大毛","黄色");

　　alert(cat1.species); // 动物

```
