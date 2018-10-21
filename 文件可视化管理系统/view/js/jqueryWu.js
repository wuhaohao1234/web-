(function (window, undefined) {
    var jQuery = function (selector) {
        return new jQuery.prototype.init(selector)
    }
    jQuery.prototype = {
        constructor: jQuery,
        init: function (selector) {
            // 去除字符串两端的空格
            selector = jQuery.trim(selector)
            // 判断selector是否是undefined或null
            if (!selector) {
                // 字符串处理
            } else if (jQuery.isString(selector)) {
                // 判断是否是代码片段
                if (jQuery.isHTML(selector)) {
                    // 根据代码片段创建元素,将创建好的一级元素添加到jquery中,给jquery对象添加length属性,返回加工好的this
                    var temp = document.createElement('div')
                    temp.innerHTML = selector
                    // for(var i = 0;i < temp.children.length;i ++){
                    //     this[i] = temp.children[i]
                    // }
                    // this.length = temp.children.length
                    var arr = []
                    arr.push.apply(this, temp.children)  //不知道为何[]不好使,只能搞一个arr数组
                    // 查询dom
                } else {
                    var res = document.querySelectorAll(selector)
                    var arr = []
                    arr.push.apply(this, res)
                }
                // 数组处理
            } else if (jQuery.isArray(selector)) {
                var arr = []
                // 把真数组转成伪数组放入$
                var arr2 = arr.slice.call(selector)
                // 将自定义的伪数组转换成真数组
                arr.push.apply(this, selector)
            } else if (jQuery.isFunction(selector)) {
                jQuery.ready(selector)
            }
            else {
                this[0] = selector;
                this.length = 1;
            }
            return this;
        },
        jquery : '吴昊的jquery',
        selector : '',
        length : 0,
        push : [].push,
        sort : [].sort,
        splice : [].splice,
        toArray : function () {
            return [].slice.call(this)
        },
        get : function (num) {
            if(arguments.length == 0){
                return this.toArray()
            }else if(num >= 0){
                return this[num]
            }else{
                return this[this.length + num]
            }
        },
        eq : function (num) {
            if (arguments.length === 0) {
                return new jQuery()
            }else{
                return jQuery(this.get(num))
            }
        },
        first : function() {
            return this.eq(0)
        },
        last : function () {
            return this.eq(-1)
        },
        each : function(fn) {
            return jQuery.each(this,fn)
        }
    }
    jQuery.extend = jQuery.prototype.extend = function (obj) {
        for (var key in obj) {
            this[key] = obj[key]
        }
    }
    // 工具方法
    jQuery.extend({
        isString: function (str) {
            return typeof str == 'string'
        },
        isHTML: function (str) {
            return str.charAt(0) == '<' && str.charAt(str.length - 1) == '>' && str.length >= 3
        },
        trim: function (str) {
            if (!jQuery.isString(str)) {
                return str
            }
            if (str.trim) {
                return str.trim()
            } else {
                return str.replace(/^\s+|\s$/g, '')
            }
        },
        isObject: function (selector) {
            return typeof selector === 'object'
        },
        isWindow: function (selector) {
            return selector === 'window'
        },
        isArray: function (selector) {
            if (jQuery.isObject(selector) && !jQuery.isWindow(selector) && 'length' in selector && selector.push) {
                return true
            } else {
                return false
            }
        },
        isFunction : function (selector) {
            return typeof selector === 'function'
        },
        ready : function(fn) {
            if(document.readyState == 'complete'){
                fn()
            }
            else if (document.addEventListener){
                document.addEventListener('DOMContentLoaded', function () {
                    fn()
                })
            }else{
                document.attachEvent('onreadystatechange', function(){
                    if (document.readyState == 'complete') {
                        fn()
                    }
                })
            }
        },
        each : function(obj,fn) {
            if(jQuery.isArray(obj)){
                for(var i = 0;i < obj.length;i ++){
                    var res = fn.call(obj[i],i ,obj[i])
                    if(res === true) {
                        continue;
                    }else if(res === false){
                        break;
                    }
                }
            }else if(jQuery.isObject(obj)) {
                for(var key in obj) {
                    var res = fn.call(obj[key],key ,obj[key])
                    if (res === true) {
                        continue;
                    } else if (res === false) {
                        break;
                    }
                }
            }
            return obj
        },
        map : function(obj,fn) {
            var res = []
            if (jQuery.isArray(obj)){
                for (var i = 0; i < obj.length; i++){
                    var temp = fn(obj[i],i)
                    if(temp) {
                        res.push(temp)
                    }
                }
            } else if (jQuery.isObject(obj)){
                for (var key in obj){
                    var temp =fn(obj[key], key)
                    if (temp) {
                        res.push(temp)
                    }
                }
            }
            return res
        },
        getStyle: function (obj, attr) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(obj)[attr]
            } else {
                return obj.currentStyle[attr]
            }
        },
        addEvent : function (obj,name,fn) {
                if (obj.addEventListener) {
                    obj.addEventListener(name,fn)
                } else {
                    obj.attachEvent('on' + name,fn)
                }
            
        },
        startMov: function (obj, json, fn) {
            clearInterval(obj.timer);//执行动画之前清除动画
            var flag = true;//是否动画都完成了
            obj.timer = setInterval(function () {
                for (var attr in json) {
                    var icur = 0;
                    if (attr == 'opacity') {
                        icur = Math.round(parseFloat(jQuery.getStyle(obj, attr)) * 100);//转换成整数,并且四舍五入下
                        //计算机在计算小数的时候往往是不准确的！
                    }
                    else {
                        icur = parseInt(jQuery.getStyle(obj, attr));
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
        },
        getParmeter : function (data) {
            var result = "";
            for (var key in data) {
                result = result + key + "=" + data[key] + "&";
            }
            /*将结果最后多余的&截取掉*/
            return result.slice(0, -1);
        },
        ajax : function (obj) {
            /*1.判断有没有传递参数，同时参数是否是一个对象*/
            if (obj == null || typeof obj != "object") {
                return false;
            }
            /*2.获取请求类型,如果没有传递请求方式，那么默认为get*/
            var type = obj.type || 'get';
            /*3.获取请求的url  location.pathname:就是指当前请求发起的路径*/
            var url = obj.url || location.pathname;
            /*4.获取请求传递的参数*/
            var data = obj.data || {};
            /*4.1获取拼接之后的参数*/
            data = this.getParmeter(data);
            /*5.获取请求传递的回调函数*/
            var success = obj.success || function () { };

            /*6:开始发起异步请求*/
            /*6.1:创建异步对象*/
            var xhr = new XMLHttpRequest();
            /*6.2:设置请求行,判断请求类型，以此决定是否需要拼接参数到url*/
            if (type == 'get') {
                url = url + "?" + data;
                /*重置参数，为post请求简化处理*/
                data = null;
            }
            xhr.open(type, url);
            /*6.2:设置请求头:判断请求方式，如果是post则进行设置*/
            if (type == "post") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            /*6.3:设置请求体,post请求则需要传递参数*/
            xhr.send(data);

            /*7.处理响应*/
            xhr.onreadystatechange = function () {
                /*8.判断响应是否成功*/
                if (xhr.status == 200 && xhr.readyState == 4) {
                    /*客户端可用的响应结果*/
                    var result = xhr.responseText;
                    /*11.拿到数据，调用客户端传递过来的回调函数*/
                    success(result);
                }
            }
        },
        // 表单验证
        Prooftest : function (obj) {
            this.error = $(obj).attr('error')
            if ($(obj).attr('rex')) {
                this.reg = eval($(obj).attr('rex'))
                this.value = $(obj).val()
                if (this.reg.test(this.value)) {
                    return true
                } else {
                    jQuery.dominance(obj, this.error)
                }
            } else {
                if ($(obj).attr('minLength') && $(obj).attr('maxLength')) {
                    var minLength = $(obj).attr('minLength'), maxLength = $(obj).attr('maxLength')
                    if (obj.value.length >= minLength && obj.value.length <= maxLength) {
                        return true
                    } else {
                        jQuery.dominance(obj,this.error)
                    }
                }else{
                    return true
                }
            }
        },
        alerts :function(summary, loginZc, form, bool) {
            $(summary).animate({ opacity: 0 })
            summary.dispaly = 'none';
            $(loginZc).animate({ top: 200 })
            if(bool == false) {
                form[0].className = ''
                form[1].className = 'hiden'
            } else {
                form[0].className = 'hiden'
                form[1].className = ''
            }
        },
        dominance : function (obj,error) {
            $(obj).val(error)
            obj.style.color = '#f00'
            setTimeout(() => {
                $(obj).val('')
                obj.style.color = '#fff'
            }, 500);
        },
        // 注册登录
        loggin : function () {
            event.preventDefault()
            if (arr.length == 2) {
                if (arr[0] && arr[1]) {
                    $.ajax({
                        url: 'http://localhost:80',
                        type: 'get',
                        data: {
                            'user': $('input')[3].value,
                            'pass': $('input')[4].value
                        },
                        success: function (data) {
                            var arr = data.split(' ')
                            for (var i = 0; i < arr.length; i++) {
                                arr[i] = eval(arr[i])
                            }
                            if (arr[0] && arr[1]) {
                                window.location.href = "www/demo2.html";
                            } else if (arr[0] && !arr[1]) {
                                $('input')[4].value = '密码错误'
                            } else if (!arr[0] && arr[1]) {
                                $('input')[3].value = '用户名不存在'
                            } else {
                                $('input')[3].value = '用户名不存在'
                                $('input')[4].value = '密码错误'
                            }
                            $('input').css('color', '#f00')
                            setTimeout(function () {
                                $('input').css('color', '#fff')
                                $('input').val('')
                            }, 500)
                        }
                    })
                } else {
                    $('input').val('请输入信息')
                    setTimeout(() => {
                        $('input').val('')
                        $('input').css(
                            'color', '#fff'
                        )
                    }, 500);
                }
            } else {
                if (arr[0] && arr[1] && arr[2]) {
                    $.ajax({
                        url: 'http://localhost:80',
                        type: 'get',
                        data: {
                            'user': $('input')[0].value,
                            'pass': $('input')[1].value
                        },
                        success: function (data) {
                            console.log(data)
                            if (data == 'true') {
                                window.location.href = "www/demo2.html";
                            } else {
                                $('input')[0].value = '用户名已存在'
                                $('input')[0].style.color = '#f00'
                                setTimeout(function () {
                                    $('input')[0].style.color = '#fff'
                                    $('input').val('')
                                }, 500)
                            }
                        }
                    })

                } else {
                    $('input').val('请输入信息')
                    setTimeout(() => {
                        $('input').val('')
                        $('input').css(
                            'color', '#fff'
                        )
                    }, 500);
                }
            }
        },
        // canvas
        canvas: function (classs, starscolor, starsamount, starsradius, movrange, speed, trailing) {
            "use strict";
            var canvas = $(classs)[0],
                ctx = canvas.getContext('2d'),
                w = canvas.width = window.innerWidth,
                h = canvas.height = window.innerHeight,
                hue = starscolor,//230  
                stars = [],
                count = 0,
                maxStars = starsamount;//星星数量  

            var canvas2 = document.createElement('canvas'),
                ctx2 = canvas2.getContext('2d');
            canvas2.width = 100;
            canvas2.height = 100;
            var half = canvas2.width / 2,
                gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
            gradient2.addColorStop(0.025, '#000');
            gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
            gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
            gradient2.addColorStop(1, 'transparent');

            ctx2.fillStyle = gradient2;
            ctx2.beginPath();
            ctx2.arc(half, half, half, 0, Math.PI * 2);
            ctx2.fill();

            // End cache  

            function random(min, max) {
                if (arguments.length < 2) {
                    max = min;
                    min = 0;
                }

                if (min > max) {
                    var hold = max;
                    max = min;
                    min = hold;
                }

                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            function maxOrbit(x, y) {
                var max = Math.max(x, y),
                    diameter = Math.round(Math.sqrt(max * max + max * max));
                return diameter / movrange;
                //星星移动范围，值越大范围越小，  
            }

            var Star = function () {

                this.orbitRadius = random(maxOrbit(w, h));
                this.radius = random(starsradius, this.orbitRadius) / 8;
                //星星半径大小  
                this.orbitX = w / 2;
                this.orbitY = h / 2;
                this.timePassed = random(0, maxStars);
                this.speed = random(this.orbitRadius) / speed;
                //星星移动速度  
                this.alpha = random(2, 10) / 10;

                count++;
                stars[count] = this;
            }

            Star.prototype.draw = function () {
                var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
                    y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
                    twinkle = random(10);

                if (twinkle === 1 && this.alpha > 0) {
                    this.alpha -= 0.05;
                } else if (twinkle === 2 && this.alpha < 1) {
                    this.alpha += 0.05;
                }

                ctx.globalAlpha = this.alpha;
                ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
                this.timePassed += this.speed;
            }

            for (var i = 0; i < maxStars; i++) {
                new Star();
            }

            function animation() {
                ctx.globalCompositeOperation = 'source-over';
                ctx.globalAlpha = trailing; //尾巴  
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, w, h)

                ctx.globalCompositeOperation = 'lighter';
                for (var i = 1, l = stars.length; i < l; i++) {
                    stars[i].draw();
                };

                window.requestAnimationFrame(animation);
            }
            animation();
        },
        canvas2: function (canvas,img) {
            var w, h, canCon, aRain;
            (function setSize() {
                window.onresize = arguments.callee
                w = window.innerWidth
                h = window.innerHeight
                canvas.width = w
                canvas.height = h
            })()
            setTimeout(function () {
                canCon = canvas.getContext('2d')
                var aRain = []
                function Rain() {

                }
                function random(min, max) {
                    return Math.random() * (max - min) + min
                }
                Rain.prototype = {
                    init: function () {
                        this.x = random(0, w)
                        this.y = 0
                        this.vY = random(1, 3)
                        this.h = random(0.8 * h, 0.9 * h)
                        this.vx = random(5, 19)
                        this.vV = random(0.05, 0.1)
                        this.opa = random(0.5, 1)
                        this.vopa = random(0.2, 0.3)
                        this.fh = random(0, 300)
                    },
                    draw: function () {
                        if (this.y < this.h) {
                            canCon.globalAlpha = this.opa
                            canCon.beginPath()
                            canCon.fillStyle = '#31f7f7'
                            canCon.drawImage(img, this.x, this.y, this.vx, this.vx)
                        }
                    },
                    move: function () {
                        if (this.y < this.h) {
                            this.y += this.vY;
                            this.vx += this.vV;
                            this.opa += this.vopa;
                        } else {
                            this.init()
                        }
                        this.draw()
                    }
                }
                function createRain(num) {
                    for (var i = 0; i < num; i++) {
                        setTimeout(function () {
                            var rain = new Rain()
                            rain.init()
                            rain.draw()
                            aRain.push(rain)
                        }, 200 * i)
                    }
                    setInterval(function () {
                        canCon.fillStyle = 'rgba(0,0,0,1)'
                        canCon.fillRect(0, 0, w, h)
                        for (var item of aRain) {
                            item.move()
                        }
                    }, 30)
                }
                createRain(30)
            }, 100)
        },
        // 下拉菜单
        dropdown: function (bigLi, container) {
            bigLi.each(function (key, ele) {
                ele.onmouseenter = function () {
                    $(container[key]).animate(
                        {
                            top: 52
                        }
                    )
                }
                ele.onmouseleave = function () {
                    $(container[key]).animate(
                        {
                            top: -250
                        }
                    )
                }
            })
        },
        // 轮播图
        Carousel: function (oSowingUl, leftBtn, rightBtn,length) {
            var num = -1,
                timer = null;
            leftBtn.onclick = function () {
                if (num == -3) {
                    oSowingUl.style.left = 0 + 'px'
                    num = 0
                }
                num--;
                jQuery.glide(oSowingUl,num)
            }
            rightBtn.onclick = function () {
                if (num == 0) {
                    oSowingUl.style.left = -3690 + 'px'
                    num = -3
                }
                num++;
                jQuery.glide(oSowingUl,num)
            }
            clearInterval(timer)
            timer = setInterval(leftBtn.onclick, 9000)
            oSowingUl.onmouseenter = function () {
                clearInterval(timer)
            }
            oSowingUl.onmouseleave = function () {
                leftBtn.onclick()
            }
        },
        glide: function (oSowingUl,num) {
            $(oSowingUl).animate(
                {
                    left: num * length
                }
            )
        }
    })


    // dom操作相关方法
    jQuery.prototype.extend({
        empty : function() {
            this.each(function (key,value) {
                value.innerHTML = ''
            })
            return this;
        },
        remove : function (selector) {
            if(arguments.length === 0) {
                this.each(function (key, value) {
                    var parent = value.parentNode
                    parent.removeChild(value)
                })
            }else{
                var $this = this;
                $(selector).each(function (key,value) {
                    var type = value.tagName;
                    $this.each(function (k,v) {
                        var t = v.tagName;
                        if(t === type) {
                            var parent = value.parentNode
                            parent.remove(value)
                        }
                    })
                })
            }
            return this;
        },
        html:function(content) {
            if(arguments.length == 0){
                return this[0].innerHTML
            }else{
                this.each(function(key,value){
                    value.innerHTML = content
                })
            }
        },
        text : function(content) {
            if (arguments.length == 0) {
                var res = ''
                this.each(function(key,value){
                    res += value.innerText;
                })
                return res;
            }else{
                this.each(function(key,value){
                    value.innerText = content;
                })
            }
        },
        appendTo : function(selector) {
            var $this = this;
            var $target = $(selector)
            var res = []
            $.each($target,function (key,value) {
                $this.each(function (k,v) {
                    if(key === 0){
                        value.appendChild(v)
                        res.push(v)
                    }else{
                        var temp = v.cloneNode(true)
                        value.appendChild(temp)
                        res.push(temp)
                    }
                })
            })
            return $(res)
        },
        prependTo : function(selector) {
            var $this = this;
            var $target = $(selector)
            var res = []
            $.each($target, function (key, value) {
                $this.each(function (k, v) {
                    if (key === 0) {
                        value.insertBefore(v,value.firstChild)
                        res.push(v)
                    } else {
                        var temp = v.cloneNode(true)
                        value.insertBefore(temp, value.firstChild)
                        res.push(temp)
                    }
                })
            })
            return $(res)
        },
        append : function (selector) {
            if (jQuery.isString(selector)) {
                
                this.html(this.html() + selector)
            }else{
                $(selector).appendTo(this)
            }
            return this
        },
        prepend : function(selector) {
            if (jQuery.isString(selector)) {
                this.html(selector + this.html())
            } else {
                $(selector).prependTo(this)
            }
            return this
        },
        insertBefore : function (selector) {
            var $this = this;
            var $target = $(selector)
            var res = []
            $.each($target, function (key, value) {
                var parent = value.parentNode
                $this.each(function (k, v) {
                    if (key === 0) {
                        parent.insertBefore(v, value)
                        res.push(v)
                    } else {
                        var temp = v.cloneNode(true)
                        parent.insertBefore(temp, value)
                        res.push(temp)
                    }
                })
            })
            return $(res)
        },
        before : function (selector) {
            var parent = this[0].parentNode
            if (jQuery.isString(selector)) {
                this[0].previousSibling.data = selector
            } else {
                selector.insertBefore(this)
            }
            return this
        },
        replaceAll : function (selector) {
            var $this = this;
            var $target = $(selector)
            var res = []
            $.each($target, function (key, value) {
                var parent = value.parentNode
                $this.each(function (k, v) {
                    if (key === 0) {
                        parent.insertBefore(v, value)
                        $(value).remove()
                        res.push(v)
                    } else {
                        var temp = v.cloneNode(true)
                        $(temp).insertBefore(value)
                        $(value).remove()
                        res.push(temp)
                    }
                })
            })
            return $(res)
        },
        clone : function (deep) {
            var res = []
            if(!deep) {
                this.each(function (key, ele) {
                    var temp = ele.cloneNode(true)
                    res.push(temp)
                }) 
            }else{
                this.each(function (key,ele) {
                    var temp = ele.cloneNode(true)
                    jQuery.each(ele.eventsCache,function (name,array) {
                        jQuery.each(array,function (index,method) {
                            
                            $(temp).on(name,method)
                        })                 
                    })
                    res.push(temp)
                })
            }
            return $(res)
        }
    })
    // 属性操作相关方法
    jQuery.prototype.extend({
        attr : function (attr,value) {
            if(jQuery.isString(attr)) {
                if(arguments.length === 1) {
                    return this[0].getAttribute(attr)
                }else{
                    this.each(function(key,ele){
                        ele.setAttribute(attr,value)
                    })
                }
            } else if (jQuery.isObject(attr)){
                var $this = this;
                $.each(attr,function(key,value){
                    $this.each(function(k,ele){
                        ele.setAttribute(key, value)
                    })
                })
            }
            return this;
        },
        prop : function (attr,value) {
            if (jQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return this[0][attr]
                } else {
                    this.each(function (key, ele) {
                        ele[attr] = value
                    })
                }
            } else if (jQuery.isObject(attr)) {
                var $this = this;
                $.each(attr, function (key, value) {
                    $this.each(function (k, ele) {
                        ele[key] = value
                    })
                })
            }
            return this;
        },
        css: function (attr, value) {
            if (jQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return jQuery.getStyle(this[0],attr)
                } else {
                    this.each(function (key, ele) {
                        ele.style[attr] = value
                    })
                }
            } else if (jQuery.isObject(attr)) {
                var $this = this;
                $.each(attr, function (key, value) {
                    $this.each(function (k, ele) {
                        ele.style[key] = value
                    })
                })
            }
            return this;
        },
        val : function(content) {
            if(arguments.length === 0) {
                return this[0].value;
            }
            if (jQuery.isString(content)) {
                this.each(function(key,ele){
                    ele.value = content
                })
            }
            return this;
        },
        hasClass : function(content) {
            var flag = false;
            if (arguments.length === 0) {
                return false;
            }else{
                var str = ' ' + content + ' ';
                this.each(function(key,ele){
                    var className = ' ' + ele.className + ' '
                    if(className.indexOf(str) != -1){
                        flag = true;
                        return false;
                    }
                })
            }
            return flag;
        },
        addClass : function(name) {
            if (arguments.length === 0) {
                return this;
            }else{
                var names = name.split(' ')
                this.each(function(key,ele){
                    $.each(names,function(k,value){
                        if(!($(ele).hasClass(value))){
                            ele.className = ele.className + ' ' + value;
                        }
                    })
                })
            }
            return this
        },
        removeClass : function (name) {
            if(arguments.length === 0){
                this.each(function(key,ele){
                    ele.className = ''
                })
            }else{
                var names = name.split(' ')
                this.each(function (key, ele) {
                    $.each(names, function (k, value) {
                        if (($(ele).hasClass(value))) {
                            ele.className = ( ' ' + ele.className + ' ').replace(' ' + value + ' ',' ')
                        }
                    })
                })
            }
            return this
        },
        toggleClass : function (name) {
            if(arguments.length === 0) {
                $(ele).removeClass()
            }
            var names = name.split(' ')
            this.each(function (key, ele) {
                $.each(names, function (k, value) {
                    if (($(ele).hasClass(value))) {
                        $(ele).removeClass(value)
                    }else{
                        $(ele).addClass(value)
                    }
                })
            })
            return this
        }
    })
    // 事件相关方法
    jQuery.prototype.extend({
        on : function (name,callback) {
            this.each(function (key,ele) {
                if (!ele.eventsCache) {
                    ele.eventsCache = {}
                }
                if (!ele.eventsCache[name]) {
                    ele.eventsCache[name] = []
                    ele.eventsCache[name].push(callback)
                    jQuery.addEvent(ele,name,function () {
                        jQuery.each(ele.eventsCache[name],function (k,method) {
                            method()
                        })
                    })
                } else {
                    ele.eventsCache[name].push(callback)
                }
            })
            return this
        },
        blur : function (fn) {
            this.each(function (key, ele){
                ele.onblur = fn;
            })
            return this
        },
        off : function (name,callback) {
            if(arguments.length === 0) {
                this.each(function (key,ele) {
                    ele.eventsCache = {}
                })
            } else if (arguments.length === 1){
                this.each(function (key,ele) {
                    ele.eventsCache[name] = []
                })
            }
            else if (arguments.length === 2) {
                this.each(function (key, ele) {
                    jQuery.each(ele.eventsCache[name],function (index,method) {
                        if(method === callback) {
                            ele.eventsCache[name].splice(index,1)
                        }
                    })
                    
                })
            }
        },
        animate: function (json, fn) {
            this.each(function (key,ele) {
                jQuery.startMov(ele,json,fn)                
            })
            return this  
        }
    })
    jQuery.prototype.init.prototype = jQuery.prototype
    window.jQuery = window.$ = jQuery
})(window)