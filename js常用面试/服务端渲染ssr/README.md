# 客户端渲染(CSR)
    
    页面初始加载的 HTML 页面中无网页展示内容，需要加载执行JavaScript 文件中的 React 代码，通过 JavaScript 渲染生成页面，同时，JavaScript 代码会完成页面交互事件的绑定

# 服务端渲染(SSR)

    用户请求服务器，服务器上直接生成 HTML 内容并返回给浏览器。服务器端渲染来，页面的内容是由 Server 端生成的。一般来说，服务器端渲染的页面交互能力有限，如果要实现复杂交互，还是要通过引入 JavaScript 文件来辅助实现。服务器端渲染这个概念，适用于任何后端语言。
    
# 同构

    同构这个概念存在于 Vue，React 这些新型的前端框架中，同构实际上是客户端渲染和服务器端渲染的一个整合。我们把页面的展示内容和交互写在一起，让代码执行两次。在服务器端执行一次，用于实现服务器端渲染，在客户端再执行一次，用于接管页面交互
    
## 使用 SSR 技术的主要因素：

1. CSR 项目的 TTFP（Time To First Page）时间比较长

    在 CSR 的页面渲染流程中，首先要加载 HTML 文件，之后要下载页面所需的 JavaScript 文件，然后 JavaScript 文件渲染生成页面。在这个渲染过程中至少涉及到两个 HTTP 请求周期，所以会有一定的耗时，这也是为什么大家在低网速下访问普通的 React 或者 Vue 应用时，初始页面会有出现白屏的原因。
    
2. CSR 项目的 SEO 能力极弱，在搜索引擎中基本上不可能有好的排名。

    目前大多数搜索引擎主要识别的内容还是 HTML，对 JavaScript 文件内容的识别都还比较弱。如果一个项目的流量入口来自于搜索引擎，这个时候你使用 CSR 进行开发，就非常不合适了。
    
3. SSR 的产生，主要就是为了解决上面所说的两个问题

    在 React 中使用 SSR 技术，我们让 React 代码在服务器端先执行一次，使得用户下载的 HTML 已经包含了所有的页面展示内容，这样，页面展示的过程只需要经历一个 HTTP 请求周期，TTFP 时间得到一倍以上的缩减。
    
    同时，由于 HTML 中已经包含了网页的所有内容，所以网页的 SEO 效果也会变的非常好。之后，我们让 React 代码在客户端再次执行，为 HTML 网页中的内容添加数据及事件的绑定，页面就具备了 React 的各种交互能力。
    
## React 中实现 SSR 技术的架构图

![avatar](https://mmbiz.qpic.cn/mmbiz_png/meG6Vo0MevhCTJz7npkhmmL7jSfxY8IQjzG0oCCBO3A8URiaXGEDF6j5n3OfaEXARrWuetJI2URHj1J2R8ehDpw/640?wx_fmt=png)



## 痛点:

    使用 SSR 这种技术，将使原本简单的 React 项目变得非常复杂，项目的可维护性会降低，代码问题的追溯也会变得困难。
    
## 实现原理:

### SSR 之所以能够实现，本质上是因为虚拟 DOM 的存在

    SSR 的工程中，React 代码会在客户端和服务器端各执行一次。你可能会想，这没什么问题，都是 JavaScript 代码，既可以在浏览器上运行，又可以在 Node 环境下运行。但事实并非如此，如果你的 React 代码里，存在直接操作 DOM 的代码，那么就无法实现 SSR 这种技术了，因为在 Node 环境下，是没有 DOM 这个概念存在的，所以这些代码在 Node 环境下是会报错的。

    好在 React 框架中引入了一个概念叫做虚拟 DOM，虚拟 DOM 是真实 DOM 的一个 JavaScript 对象映射，React 在做页面操作时，实际上不是直接操作 DOM，而是操作虚拟 DOM，也就是操作普通的 JavaScript 对象，这就使得 SSR 成为了可能。在服务器，我可以操作 JavaScript 对象，判断环境是服务器环境，我们把虚拟 DOM 映射成字符串输出；在客户端，我也可以操作 JavaScript 对象，判断环境是客户端环境，我就直接将虚拟 DOM 映射成真实 DOM，完成页面挂载。


## 参考

    https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651230283&idx=1&sn=9d83443fd9cf76707b90d6613acb2296&chksm=bd4949cf8a3ec0d9b03271813d9813b11257f077a2b18038ebe74c2929fd38843695e1fdbdc8&mpshare=1&scene=1&srcid=1111xMVTiziIbnHVy56yIzqn#rd
    
    https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651225461&idx=1&sn=c14383c7cd4b72ed544120996a5595d6&chksm=bd49a4f18a3e2de78d344c13b4aa2676959eecfbd0ea548466e3473c433c432ee42b9d2a1831&scene=21#wechat_redirect
    
    https://github.com/chikara-chan/react-isomorphic-boilerplate
    
    https://www.jianshu.com/p/0ecd727107bb