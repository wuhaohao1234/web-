# Vue MVVM

## 访问器属性Object.defineProperty

```
    var obj = {}
    var value = 'hello'
    Object.defineProperty(obj,'name',{
        get:()=>{
            console.log('我获取到值')
            return value
        },
        set:(newValue)=>{
            console.log('我被设置新的值')
            value = newValue
            return value
        }
    })
    obj.name = '我是新的值'
    console.log(obj.name)
```

## 简单双向数据绑定的实现

```
<input type="text" id="a" >
<span id="b" ></span>
<script>
    var obj = {}
    var value = 'hello '
    Object.defineProperty(obj,'name',{
        get:()=>{
            return value
        },
        set:(newValue)=>{
            document.getElementById('b').innerHTML = newValue
            return value
        }
    })
    document.getElementById('a').addEventListener('input',(e)=>{
        obj.name = e.target.value
    })
</script>
```

## DocumentFragment(文档片段)

```
    <div id="app">
        <p></p>
        <input type="text">
    </div>
    <script>
        var dom = nodeToFragement(document.getElementById('app'))
        function nodeToFragement(node) {
            //可生成一个虚拟的dom
            var flag = document.createDocumentFragment()
            var child ;
            while(child = node.firstChild) {
                flag.appendChild(child)
            }
            return flag
        }
        document.getElementById('app').appendChild(dom)
    </script>

```

## 数据初始化绑定

```
class Vue {
    constructor(options) {
        this.data = options.data
        var vm = this
        this.nodeToFragement(options.el,vm)
    }
    //得到文档片段#app
    nodeToFragement(el,vm){
        var node = document.querySelector(el)
        var flag = document.createDocumentFragment()
        var child;
        while(child = node.firstChild) {
            this.compile(child,vm)
            flag.appendChild(child)
        }
        node.appendChild(flag)
    }
    compile(node,vm) {
        var reg = /\{\{(.*)\}\}/;
        //判断标签
        if(node.nodeType === 1) {
            var attr = node.attributes
            for(var i = 0;i <attr.length;i ++) {
                if(attr[i].nodeName === 'v-model') {
                    var name = attr[i].nodeValue
                    node.value = vm.data[name]
                }
            }
        }
        //判断是否是文本
        if(node.nodeType === 3) {
            if(reg.test(node.nodeValue)) {
                var name = RegExp.$1
                name = name.trim()
                node.nodeValue = vm.data[name]
            }
        }
    }
}
```

## 响应式输入框数据绑定

## 发布订阅模式

```
    //发布者
    var pub = {
        publish:function() {
            dep.notify()
        }
    }

    var sub1 = {
        upDate:function() {
            console.log(1)
        }
    }
    var sub2 = {
        upDate:function() {
            console.log(2)
        }
    }
    var sub3 = {
        upDate:function() {
            console.log(3)
        }
    }
    //订阅者
    function Dep() {
        this.subs = [sub1,sub2,sub3]
    }

    Dep.prototype.notify = function() {
        this.subs.forEach(function(sub){
            sub.upDate()
        })
    }
    var dep = new Dep()
    pub.publish()
```



## 双向数据绑定的实现