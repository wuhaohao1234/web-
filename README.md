# js跨域详解

- 参考:
  http://www.ruanyifeng.com/blog/2016/04/cors.html
  http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html
  https://github.com/wangdawei0418/steamDataAPI/blob/master/http.js

## 为什么会产生跨域

* 原因:浏览器的同源策略

* a网页设置的cookie，b网页不能打开，除非这两个同源

### 同源:

* 协议相同:http或https

* 域名相同

* 端口相同

- 同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

### 非同源，共有三种行为受到限制。

* Cookie、LocalStorage 和 IndexDB 无法读取。

* DOM 无法获得。

* AJAX 请求不能发送。

- 同源政策规定，AJAX请求只能发给同源的网址，否则就报错。


## 解决跨域办法

* JSONP

- 网页通过添加一个<script>元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

* WebSocket

- WebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信

- 类似qq

- 详情查看http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html

* CORS

- CORS是跨源资源分享（Cross-Origin Resource Sharing）的缩写。它是W3C标准，是跨源AJAX请求的根本解决方法。相比JSONP只能发GET请求，CORS允许任何类型的请求。

## 如何实现

* JSONP:

- 浏览器:
```
  function addScriptTag(src) {
    var script = document.createElement('script');
    script.setAttribute("type","text/javascript");
    script.src = src;
    document.body.appendChild(script);
  }

  window.onload = function () {
    addScriptTag('http://example.com/ip?callback=foo');
  }

  function foo(data) {
    console.log('Your public IP address is: ' + data);
  };

```

- 服务器:

```
  let params = urlLib.parse(req.url, true).query;
  let callback = params.callback;
  let data = '数据'
  res.end(callback + "(" + data + ")")

```

### cors详细:

* 版本:所有浏览器都支持，ie>=ie10

* 浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

- 简单请求:请求方式

  - Head

  - get

  - post

- HTTP的头信息不超出以下几种字段：

  - Accept
  - Accept-Language
  - Content-Language
  - Last-Event-ID
  - Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

- 解决办法:服务端设置

```
  Access-Control-Allow-Origin: http://api.bob.com
  Access-Control-Allow-Credentials: true
  Access-Control-Expose-Headers: FooBar
  Content-Type: text/html; charset=utf-8
```

*（1）Access-Control-Allow-Origin

  该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。

*（2）Access-Control-Allow-Credentials

  该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。

*（3）Access-Control-Expose-Headers

  该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。
