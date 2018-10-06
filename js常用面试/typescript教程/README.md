# typescript教程

## 安装
`npm install -g typescript`
## 编译
`tsc 文件`
## 类型注释
  TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式。 在这个例子里，我们希望 greeter函数接收一个字符串参数。
```
  function greeter(person:string) {
      return "Hello, " + person;
  }

  // let user = "Jane User";

  let user = [0,1,2,4]

  document.body.innerHTML = greeter(user);

```
* 在上面往greeter函数传递过去一个数组，它会直接报错

## 接口
  让我们开发这个示例应用。这里我们使用接口来描述一个拥有firstName和lastName字段的对象。 在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以
```
  interface Person {
      firstName: string;
      lastName: string;
  }

  function greeter(person: Person) {
      return "Hello, " + person.firstName + " " + person.lastName;
  }

  let user = { firstName: "Jane", lastName: "User" };

  document.body.innerHTML = greeter(user);
```
# 类
  TypeScript支持JavaScript的新特性，比如支持基于类的面向对象编程。
```
  class Student {
      fullName: string;
      constructor(public firstName, public middleInitial, public lastName) {
          this.fullName = firstName + " " + middleInitial + " " + lastName;
      }
  }

  interface Person {
      firstName: string;
      lastName: string;
  }

  function greeter(person : Person) {
      return "Hello, " + person.firstName + " " + person.lastName;
  }

  let user = new Student("Jane", "M.", "User");

  document.body.innerHTML = greeter(user);
```
