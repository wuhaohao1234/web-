# eslint测试

## 初始化
```
    mkdir eslint-demo
    npm init -y
```
## 安装本地依赖
```
    cnpm install --save -dev eslint
    cnpm install --save -dev eslint-config-airbnb-base eslint-plugin-import
```
* 用别人已经写好的代码检查规则，这里使用的是 Airbnb 公司的规则
## 创建并编写启动文件.eslintrc.json
```
    {
        "extends": "airbnb-base"
    }
```
## 编写启动命令
    package.json中的scripts添加
```
    "lint": "eslint **/*.js",
    "lint-html": "eslint **/*.js -f html -o ./reports/lint-results.html",
    "lint-fix": "eslint --fix **/*.js"
```
## 创建被测试的文件index.js
```
    var a = 3
    console.log(a)
```
## 运行命令
`npm run lint`
* 得到两个错误分别是不能使用var关键字,开发者模式不能有console
## 修复命令
`npm run lint-fix`
    可以看到index.js中var关键字变为cont
    可是还有console
## .eslintrc.json中添加配置
```
{
    "extends": "airbnb-base",
    "rules":{
        "no-console":"off"
    }
}
```
## 重新测试
`npm run lint`
    无错误