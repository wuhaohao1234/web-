# angularJs脏值检测原理

    Angular的双向绑定是采用“脏检测”的方式来更新DOM
    Angular对常用的dom事件、xhr事件进行了封装，触发时会调用$digest cycle。在$digest流程中，Angular将遍历每个数据变量的watcher，比较它的新旧值。当新旧值不同时，触发listener函数，执行相关的操作。