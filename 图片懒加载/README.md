# js实现图片懒加载

* 原理:首先去掉img里面的src属性,加入data-src='图片地址',然后通过img.dataset.src可以得到图片地址

```
	<img class="my-photo" alt="loading" data-src="图片地址">
	console.log(img.dataset.src)//打印出图片地址
```

* 通过img.getBoundingClientRect()可以得到图片的距离,大小.通过window.innerHeight得到可视区域的高度。可以判断图片距离顶部的高度与可视区域高度的比较，若小于，则给图片添加src属性

```
	let bound = img.getBoundingClientRect();
	let clientHeight = window.innerHeight;
	if(bound.top <= clientHeight + 100) {
		img.src = img.dataset.src
	}
```

* 当页面滚动的时候重复执行以上函数