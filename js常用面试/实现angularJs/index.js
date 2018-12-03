function Scope() {
    this.$$watchers = [];         //监听器
}

Scope.prototype.$watch = function (name, exp, listener) {
    this.$$watchers.push({
        name: name,                              //数据变量名
        last: '',                                //数据变量旧值
        newVal: exp,                             //返回数据变量新值的函数
        listener: listener || function () { }       //监听回调函数，变量“脏”时触发
    })
}

Scope.prototype.$digest = function () {
    var bindList = document.querySelectorAll("[ng-bind]");      //获取所有含ng-bind的DOM节点
    var dirty = true;
    while (dirty) {
        dirty = false;
        for (var i = 0; i < this.$$watchers.length; i++) {
            var newVal = this.$$watchers[i].newVal();
            var oldVal = this.$$watchers[i].last;
            if (newVal !== oldVal && !isNaN(newVal) && !isNaN(oldVal)) {
                dirty = true;
                this.$$watchers[i].listener(oldVal, newVal);
                this.$$watchers[i].last = newVal;
                for (var j = 0; j < bindList.length; j++) { 
                    //获取DOM上的数据变量的名称
                    var modelName = bindList[j].getAttribute("ng-bind");
                    //数据变量名相同的DOM才更新
                    if (modelName == this.$$watchers[i].name) {
                        if (bindList[j].tagName == "INPUT") {
                            //更新input的输入值
                            bindList[j].value = this[modelName];
                        }
                        else {
                            //更新非交互式DOM的值
                            bindList[j].innerHTML = this[modelName];
                        }
                    }
                }
            }
        }
    }
};

window.onload = function () {
    var $scope = new Scope();
    $scope.count = 0;
    $scope.increment = function () {
        $scope.count++;
    };

    //解析ng指令
    var bindList = document.querySelectorAll("[ng-click]");
    for (var i = 0; i < bindList.length; i++) {
        bindList[i].onclick = (function (index) {
            return function () {
                $scope[bindList[index].getAttribute("ng-click")]();
                $scope.$digest();           //调用函数时触发$digest
            }
        })(i)
    }

    var inputList = document.querySelectorAll("input[ng-bind]");
    for (var i = 0; i < inputList.length; i++) {
        inputList[i].addEventListener("input", (function (index) {
            return function () {
                $scope[inputList[index].getAttribute("ng-bind")] = inputList[index].value;
                $scope.$digest();           //调用函数时触发$digest
            }
        })(i));
    }

    //绑定数据
    for (var key in $scope) {
        if (key != "$$watchers" && typeof $scope[key] != "function") {            //非函数数据才进行绑定
            $scope.$watch(key, (function (index) {
                return function () {
                    return $scope[index];
                }
            })(key))
        }
    }
};
