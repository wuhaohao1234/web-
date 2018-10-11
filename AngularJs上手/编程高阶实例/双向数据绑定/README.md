## 双向数据绑定

### module数据层:data
```
    this.$el = document.querySelector(options.el)
    this.$data = options.data
    this.$methods = options.methods

    this.watchers = new Map()

    this.watchers.set(key,{ _directives:[]})
```
### 中间层Object.defineProperty

```
    Object.defineProperty(this.$data,key,{
        get() {
            return value
        },
        set(newValue) {
            value = newValue
            for(let i = 0;i <watchers._directives.length;i ++) {
                watchers._directives[i].update()
            }
        }
    })
```

### view显示层:mv-model,mv-bind

* mv-model

```
    let uData = node.getAttribute('mv-model');
    this.watchers.get(uData)._directives.push(new Watcher({
        el: node,
        vm: this,
        uData,
        attr: 'value'
    }));
    node.addEventListener('keyup', function () {
        _this.$data[uData] = this.value
    })
```
* mv-bind

```
    var uData = node.getAttribute('mv-bind');
    //给属性增加一个watcher
    this.watchers.get(uData)._directives.push(new Watcher({
        el: node,
        vm: this,
        uData,
        attr: 'innerHTML'
    }));
```

### 行为层(监听层)Watcher
```
    class Watcher {
        constructor({ el, vm, uData, attr }) {
            this.el = el;
            this.vm = vm;
            this.uData = uData;
            this.attr = attr;
            this.update();
        }
        update() {
            this.el[this.attr] = this.vm.$data[this.uData];
        }
    }
```




### 分析

* mv-model负责将用户输入的数据重新赋值给data里面的msg。从而触发了中间层与监听层
    中间层负责将原来的数据oldValue替换为newValue。监听层负责重新渲染新的数据

* 由此得出:vue实现的双向数据绑定本质上还是发布订阅模式

#### 发布data

#### 订阅update(渲染数据)

```
update() {
    //this.el其实就是dom
    this.el[this.attr] = this.vm.$data[this.uData];
}
```

#### 调度中心Object.defineProperty
```
    Object.defineProperty(data,key,{
        get() {
            //返回旧的数据
        },
        set(newValue) {
            value = newValue
            //执行渲染数据update
        }
    })

```