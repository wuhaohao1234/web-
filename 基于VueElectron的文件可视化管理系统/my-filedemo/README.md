# 文件可视化管理系统说明文档

## 初始化展示视图

* 在FileView组件中的mounted

1. 初始化引用store/staticFileName.fileName作为初始渲染文件名(help.md),并监听fileName
    采用fileRead里面的fsAPI读取state/help.md并返回markdown文件(展示文件)与源文件(可编辑文件)
2. 通过newFileCache将源文件加入到缓存(store/cacheFile.filecache)当中
3. 通过fileshow引入wangeditor来展示file(这里在init函数，初始化展示)
    fileshow有两个区域：
    * 视图区div.editor获得解析后的代码
    * 编辑区textarea获得源文件编辑
    * 默认视图区先显示,编辑区隐藏

## 命令行模式与编辑模式的切换

* 在Command

1. 引入store/countState.count来判断是否在命令行模式
    若count为false命令行模式,为true编辑模式
    初始化count为false
2. 在command中mounted初始化count为false则进入命令行模式
    输入框自动获得焦点(33行代码)
3. 输入框绑定事件来监听用户输入内容addInp
    若按下i键，也就是event.keyCode===73则自动更新count为true进入编辑模式
4. 在FileView组件中watch监听count值，若为true，则textarea获得焦点
    若count为true则编辑区textarea获得焦点并显示
    为false，视图区显示
5. FileView组件全局监听addCommandCount用户按下esc键，则进入命令行区域
    * addCommandCount事件一旦触发自动更新count的值变为false
    * Command监听count值为false获得焦点

## 编辑所有的内容全部加载到缓存中

1. Fileshow组件监听textarea中的addTxt事件
    通过newCache将所有编辑文件放在fileCache
2. 这样用户不管按下esc键，还是i键，视图区域与编辑区域总是加载的是缓存里面的内容

`this.fileShow.distinguish(this.count,this.fileCache)`

## 读写文件方式

* 在Command组件中this.CommandInp.Inp

1. 当用户在命令行区域按下回车键进入this.CommandInp.Inp
    * CommandInp在command组件初始化时挂在一个dbFile目录树
        staticFileName.dbFile:
        ```
            dbFile:[
                {
                    fileName:'help.md',
                    type:'file'
                }
            ]
        ```
    * CommandInp.Inp接受4个参数
    * inpTxt :input
    * fileCache : 缓存文件
    * newDbFile : 更改目录树的方法
    * newFileName : 更改显示文件的文件名(一旦更改，显示区与编辑区域可自动刷新)
    * fileName:当前文件的文件名
2. 通过正则匹配判断用户读文件还是写入文件
    * 读文件:
        1. 首先遍历dbFile，若存在该文件，则调用newFileName显示到fileView
        2. 若不存在，暂时什么也不做
    * 写入文件
        1. 首先遍历dbFile，若存在该文件，则调用newFileName显示到fileView,并将编辑到缓存区域的内容通过写入文件缓存
        2. 若不存在，则将编辑到缓存区域的内容通过写入文件缓存到用户输入的文件名