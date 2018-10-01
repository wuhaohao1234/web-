# 移动端适配总结

## 视口
    视口分为视觉视口与布局视口
```
  <!-- css -->
    *{
      margin: 0;
      padding: 0;
    }
    html,body{
      height: 100%;
    }
    .left,.right{
      float: left;
    }
    .left{
      width: 20%;
      height: 100%;
      background: #f60;
    }
    .right{
      width: 80%;
      height: 100%;
      background: #ccc;
    }
    <!-- html -->
    <div class="left"></div>
    <div class="right"></div>
```
* 一切以iphone6为例子
* 布局视口:980(body宽度)
* 视觉视口:375
* 元素宽度:20%，布局视口下:196
* 视觉视口:75
* 元素宽度:20%，布局视口下:784
* 视觉视口:300
* 布局视口设置成为浏览器（屏幕）的宽度:
* <meta name="viewport"content="width=device-width,initial-scale=1">
* 布局视口=视觉视口

## 现今，适配手机端的传统rem布局已经逐步被手淘团队的一套flexible布局代替。
