# Mocha测试
    最常用的测试
## 创建文件夹并初始化
```
    mkdir Mocha
    npm init -y
```
## 添加依赖
```
    cnpm install -D mocha
    cnpm install -D chai
```
## 创建被测试文件add.js
```
    function add(x, y) {
        return x + y;
    }

    module.exports = add;
```
## 创建测试文件add.test.js
```
    var add = require('./add.js');
    var expect = require('chai').expect;

    describe('加法函数的测试', function () {
        it('1 加 1 应该等于 2', function () {
            expect(add(1, 1)).to.be.equal(2);
        });
    });
```
* 测试脚本与所要测试的源码脚本同名，但是后缀名为.test.js（表示测试）或者.spec.js（表示规格）。比如，add.js的测试脚本名字就是add.test.js。

* 测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块
    describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"加法函数的测试"），第二个参数是一个实际执行的函数。
    it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"1 加 1 应该等于 2"），第二个参数是一个实际执行的函数。
* 上面的测试脚本里面，有一句断言。
`expect(add(1, 1)).to.be.equal(2);`
    所谓"断言"，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。上面这句断言的意思是，调用add(1, 1)，结果应该等于2。

    所有的测试用例（it块）都应该含有一句或多句的断言。它是编写测试用例的关键。断言功能由断言库来实现，Mocha本身不带断言库，所以必须先引入断言库require('chai').expect
## 添加测试命令
```
    "scripts": {
    "test": "mocha *.test.js"
    }
```

## 运行测试
`npm test`
    测试无错误