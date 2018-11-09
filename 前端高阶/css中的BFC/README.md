# css中的BFC

## BFC定义

	块级格式化上下文，它是指一个独立的块级渲染区域，只有Block-level,Box参与，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关。

## BFC的生成

* 根元素或其它包含它的元素

* float的值不为none；

* overflow的值不为visible；

* position的值不为static；

* display的值为inline-block、table-cell、table-caption；

* flex boxes (元素的display: flex或inline-flex)；

## BFC的布局规则

1. 内部的元素会在垂直方向一个接一个地排列，可以理解为是BFC中的一个常规流

2. 元素垂直方向的距离由margin决定，即属于同一个BFC的两个相邻盒子的margin可能会发生重叠

3. 每个元素的左外边距与包含块的左边界相接触(从左往右，否则相反)，即使存在浮动也是如此，这说明BFC中的子元素不会超出它的包含块

4. BFC的区域不会与float元素区域重叠

5. 计算BFC的高度时，浮动子元素也参与计算

6. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然

## BFC解决问题:

### margin传递与margin重叠

* margin传递

```
/*在没有写overflow:hidden的时候，没有触发bfc,box高度与banner高度相等，但是发生边距传递*/
.box{
	background: #ccc;
	overflow: hidden;
}
/*加入overflow:hidden。触发bfc，box高度变为300px*/
.banner{
	height: 100px;
	background: pink;
	margin: 100px 0;
}

<div class="box">
	<div class="banner"></div>
</div>
```

* margin重叠

```
.banner{
	margin: 100px;
	height: 100px;
	background: pink;
	margin: 100px 0;
}
.box{
	overflow: hidden;
	background: #ccc;
}

<!-- <div class="banner">1</div>
	<div class="banner">2发生边距重叠</div>
	<div class="banner">3</div> -->

-----------------------------------------------------

	<div class="banner">1</div>
	<div class="box">
		<div class="banner">2不会发生边距重叠</div>
	</div>
	<div class="banner">3</div>
```

### 解决浮动所造成的高度塌陷

```
.banner{
	width:100px;
	height: 100px;
	box-sizing: border-box;
	background: pink;
	float: left;
}
/*加入overflow:hidden后box的高度就有*/
.box{
	/*overflow: hidden;*/
}


<div class="box">
	<div class="banner"></div>
	<div class="banner"></div>
	<div class="banner"></div>
	<div class="banner"></div>
</div>

```

### 解决与浮动元素重叠

```

.box{
	width: 100px;
	height: 100px;
	background: pink;
	<!-- overflow: hidden; -->
}
.banner{
	width: 50px;
	height: 50px;
	background: #000;
	float: left;
}
<div class="banner"></div>/*代码先执行bannner然后是box*/
<div class="box"></div>
```

* 当不加入overflow:hidden的时候,banner脱离文档流，box与banner重叠,当给box加入overflow:hidden后不会重叠