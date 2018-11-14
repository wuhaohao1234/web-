
function Watcher(vm, node, name, nodeType) {
    Dep.target = this
    this.vm = vm
    this.name = name
    this.node = node
    this.nodeType = nodeType
    this.update()
    Dep.target = null
}

Watcher.prototype = {
    update:function() {
        this.get()
        if(this.nodeType === 'text') {
            this.node.nodeValue = this.value
        }
        if(this.nodeType === 'input') {
            this.node.value = this.value
        }
    },
    get:function() {
        this.value = this.vm.data[this.name]
    }
} 

function Dep() {
    this.subs = []
}
Dep.prototype = {
    addSub:function(sub) {
        this.subs.push(sub)
    },
    notify:function() {
        this.subs.forEach(function(sub){
            sub.update()
        })
    }
}

function Vue(options) {
    this.data = options.data
    this.el = options.el
    var vm = this
    this.observe(this.data,vm)
    this.nodeToFragment(vm,document.querySelector(this.el))
}

Vue.prototype = {
    compile:function(vm,node) {
        var reg = /\{\{(.*)\}\}/
        if(node.nodeType === 1) {
            var attr = node.attributes
            for(var i = 0;i < attr.length;i ++) {
                if(attr[i].nodeName === 'v-model') {
                    var name = attr[i].nodeValue
                    node.addEventListener('input',function(e) {
                        vm.data[name] = e.target.value
                    })
                    new Watcher(vm, node, name, 'input');
                }
            }
        }
        if(node.nodeType === 3) {
            if(reg.test(node.nodeValue)) {
                var name = RegExp.$1
                name = name.trim()
                new Watcher(vm, node, name, 'text');
            }
        }
    },
    nodeToFragment:function(vm,node) {
        var flag = document.createDocumentFragment()
        var child
        while(child = node.firstChild) {
            this.compile(vm,child)
            flag.appendChild(child)
        }
        node.appendChild(flag)
    },
    defineReactive:function(obj,key,val) {
        var dep = new Dep()
        Object.defineProperty(obj,key,{
            get:function() {
                if(Dep.target) {
                    dep.addSub(Dep.target)
                }
                return val
            },
            set:function(newValue) {
                val = newValue
                dep.notify()
            }
        })
    },
    observe:function(obj,vm) {
        Object.keys(obj).forEach(function(key){
            vm.defineReactive(obj,key,obj[key])
        })
    }
}