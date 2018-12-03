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
    var bindList = document.querySelectorAll("[ng-bind]");//input div
    var dirty = true;
    while (dirty) {
        dirty = false;
        for (var i = 0; i < this.$$watchers.length; i++) {
            var newVal = this.$$watchers[i].newVal();
            var oldVal = this.$$watchers[i].last;
            //初始化的时候不等于newVal为0,oldVal为'',第二次的时候都为0,不会进入下面
            if (newVal !== oldVal && !isNaN(newVal) && !isNaN(oldVal)) {
                dirty = true;
                
                //暂时不知道this.$$watchers[i].listener是什么作用?一直是个空函数
                this.$$watchers[i].listener(oldVal, newVal);
                //this.$$watchers[i].last = 0
                this.$$watchers[i].last = newVal;
                //视图层更新数据
                for (var j = 0; j < bindList.length; j++) {
                    var modelName = bindList[j].getAttribute("ng-bind");
                    
                    if (modelName == this.$$watchers[i].name) {
                        if (bindList[j].tagName == "INPUT") {
                            bindList[j].value = this[modelName];
                        }
                        else {
                            bindList[j].innerHTML = this[modelName];
                        }
                    }
                }
            }
        }
    }
};


var $scope = new Scope();
$scope.count = 0;
$scope.increment = function () {
    this.count++;
};
//解析ng指令
var bindList = document.querySelectorAll("[ng-click]");
for (var i = 0; i < bindList.length; i++) {
    bindList[i].onclick = (function (index) {
        return function () {
            //等价于$scope.increment()
            $scope[bindList[index].getAttribute("ng-click")]();
            $scope.$digest();           
        }
    })(i)
}

var inputList = document.querySelectorAll("input[ng-bind]");
for (var i = 0; i < inputList.length; i++) {
    inputList[i].addEventListener("input", (function (index) {
        return function () {
            //等价于$scope.count = input.value
            $scope[inputList[index].getAttribute("ng-bind")] = inputList[index].value;
            $scope.$digest();           
        }
    })(i));
}

//绑定数据
for (var key in $scope) {
    if (key != "$$watchers" && typeof $scope[key] != "function") {            //非函数数据才进行绑定
        $scope.$watch(key, (function (key) {
            return function () {
                //返回$scope.count
                return $scope[key];
            }
        })(key))
    }
}
$scope.$digest();

