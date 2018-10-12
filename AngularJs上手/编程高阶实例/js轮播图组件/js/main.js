((win)=>{
    // 动画函数
    let getStyle = (obj, attr) => {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj)[attr]
        } else {
            return obj.currentStyle[attr]
        }
    }

    let animate = (obj, json, fn) => {
        clearInterval(obj.timer);//执行动画之前清除动画
        var flag = true;//是否动画都完成了
        obj.timer = setInterval(function () {
            for (var attr in json) {
                var icur = 0;
                if (attr == 'opacity') {
                    icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);//转换成整数,并且四舍五入下
                    //计算机在计算小数的时候往往是不准确的！
                }
                else {
                    icur = parseInt(getStyle(obj, attr));
                }
                var speed = 0;
                speed = (json[attr] - icur) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (icur != json[attr]) {
                    flag = false;
                }
                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity:' + (icur + speed) + ')';
                    obj.style.opacity = (icur + speed) / 100;
                }
                else {
                    obj.style[attr] = icur + speed + 'px';
                }
                if (flag) {
                    clearInterval(obj.timer);
                    if (fn) {
                        fn();
                    }
                }
            }
        }, 30);
    }

    var log = console.log.bind(this)
    var doc = document
    // 默认数据
    var arrImg = [
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
    ]
    // 添加元素
    function appendNodes(app, src) {
        if(src.length < 2){
            console.log('滚,下面必然报错')
            return
        }
        var style = doc.createElement('style')
        style.innerHTML = `
            #app,#app ul,#app ul li,#app ul li img{
                margin: 0;
                padding: 0;
            }
            #app{
                position: relative;
                width: 680px;
                margin: 20px auto;
                box-sizing: border-box;
                height: 344px;
                overflow: hidden;
            }
            #app ul{
                width: 10000px;
                top:0;
                left: 0;
                position: absolute;
            }
            #app ul li{
                list-style: none;
                float: left;
            }
            #app .btnRight,#app .btnLeft{
                display: inline-block;
                position: absolute;
                top:50%;
                margin-top:-66px;
                z-index: 99;
                opacity: .7;
            }
            .btnLeft{
                right: 20px;
            }
            .btnRight{
                left: 20px;
            }
            .btnRight:hover,.btnLeft:hover{
                cursor: pointer;
                opacity: 1;
                padding: 1px;
            }
        `
        doc.getElementsByTagName('head')[0].appendChild(style)
        this.ul = doc.createElement('ul')
        // 向首添加最后一个元素
        var liFirst = doc.createElement('li')
        liFirst.innerHTML = `
            <img src="${src[src.length - 1]}" >
        `
        this.ul.appendChild(liFirst)
        // 添加全部元素
        src.forEach((path) => {
            var li = doc.createElement('li')
            li.innerHTML = `
                <img src="${path}" >
            `
            this.ul.appendChild(li)
        });
        // 向尾添加第一个元素
        var liLast = doc.createElement('li')
        liLast.innerHTML = `
            <img src="${src[0]}" >
        `
        this.ul.appendChild(liLast)
        this.app.appendChild(this.ul)
        // 添加按钮
        this.btnLeft = doc.createElement('span')
        this.btnLeft.className = 'btnLeft'
        this.btnLeft.innerHTML = `
            <img src="./img/next.png" >
        `
        this.btnRight = doc.createElement('span')
        this.btnRight.className = 'btnRight'
        this.btnRight.innerHTML = `
            <img src="./img/prev.png" >
        `
        this.app.appendChild(this.btnLeft)
        this.app.appendChild(this.btnRight)

        return liFirst
    }

    function renderInit(app, src) {
        this.appendNodes = appendNodes
        // 添加元素
        this.appendNodes(app, src)
        var liFirst = this.appendNodes(app, src)
        // 通过其中的一个列表动态修改样式
        liFirst.querySelector('img').onload = () => {
            this.width = liFirst.querySelector('img').width
            this.ul.style.width = this.width * (src.length + 2) + 'px'
            this.ul.style.left = 0
            // 初始化key为-1
            this.key = -1
            this.render(this.key)
        }
    }

    class Sowing {
        constructor(str, src) {
            this.init(str, src)
        }
        init(str, src) {
            if (doc.querySelector(str)) {
                this.app = doc.querySelector(str)
                this.src = src || arrImg
            } else {
                console.log('传参错误')
                return
            }
            this.renderInit = renderInit
            this.renderInit(this.app, this.src)
            this.action()
        }
        render(key) {
            this.left = key * this.width
            animate(this.ul, {
                left: this.left
            })
        }
        action() {
            this.btnLeft.addEventListener('click', () => {
                this.key -= 1
                if (this.key === -9) {
                    this.ul.style.left = 0
                    this.key = -1
                }
                this.render(this.key)
            })
            this.btnRight.addEventListener('click', () => {
                this.key += 1
                if (this.key === 0) {
                    this.ul.style.left = -(this.src.length + 1) * this.width + 'px'
                    this.key = -this.src.length
                }
                this.render(this.key)
            })
        }
    }
    win.Sowing = Sowing
})(window)