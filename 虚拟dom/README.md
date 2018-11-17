# 虚拟dom

## dom与Virtual dom

### dom
    document Object Model(文档对象模型)
* 节点集合

### Virtual dom
    虚拟dom(虚拟节点的集合)
### Virtual node
    虚拟节点:
* 通过document.createElement(node)创建的节点(在内存中的，还没有挂载到页面上,挂载到页面上以后变成真实的节点)
    
```
    //构建虚拟div节点
    var q5 = document.createElement('div')
    q5.id = 'Q5'
    //构建虚拟img节点
    var img = document.createElement('img')
    img.src = 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_efde696.png'
    q5.appendChild(img)
    //添加页面上变成真实dom
    document.body.appendChild(q5)
```
## 构建Virtual dom

### 构建Vnode

```
{
    type:'div',
    props:{
        "style":""
    },
    children:[
        
    ]
}

```
#### 安装依赖
```

    "babel-core": "^6.26.0",
    "babel-plugin-transform-react-jsx": "^6.24.1",
    "babel-preset-env": "^1.6.1",
    "min-http": "^1.0.3",
    "rollup": "^0.53.1",
    "rollup-plugin-babel": "^3.0.3"
```
#### 编写rollup.config.js
```
    // rollup.config.js
    import babel from 'rollup-plugin-babel'

    export default {
        input: 'src/vnode/node-dom.js',
        output: {
            file: 'dist/vnode/node-dom.js',
            format: 'cjs'
        },
        banner: '/* fed123.com */',
        plugins: [
            babel({
                "presets": [[
                    "env",
                    {
                        "modules": false
                    }
                ]],
                "plugins": [
                    ["transform-react-jsx", {
                        "pragma": "vnode"
                    }]
                ]
            })
        ]
    }

```
#### 创建dom
```

    //src/vnode/node-dom.js

    const vdom = (
        <div id="_Q5" style="border: 1px solid red;">
            <div>
                <h2>我是H2</h2>
            </div>
        </div>)

    function vnode(type,props,...children) {
        return {
            type,
            props,
            children
        }
    } 

    function createElement(node) {
        if(typeof node === 'string') {
            return document.createTextNode(node)
        }
        const $el = document.createElement(node.type)
        node.children.map(createElement).forEach($el.appendChild.bind($el))
        return $el


    }
    document.body.appendChild(createElement(vdom))
```
#### 启动

```
    "build": "rollup -c rollup.config.js"
    npm run build

```
* 元素类型

* 元素属性

* 子元素结合

## Diff Virtual dom & Updata

## Handle Props & Event

