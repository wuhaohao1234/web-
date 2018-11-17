var arr = [12,3,4,5,5,23232,6,3,5,5,3,454,5,45,46,46,456456,45,45,54,545,]


class TwoForkedTree {
    constructor(options) {
        this.init(options)
    }
    //初始化二叉树
    init(data) {
        this.objArrTree = {
            value : data[0]
        }
        for(var i = 1;i <data.length;i ++) {
            this.compare(this.objArrTree,this.objArrTree.value,data[i])
        }
    }
    compare(root,rootValue,newValue){
        if(rootValue >= newValue) {
            if(root.leftNode) {
                this.compare(root.leftNode,root.leftNode.value,newValue)
            }else{
                root.leftNode = {
                    value:newValue
                }
            }
        }else{
            if(root.rightNode) {
                this.compare(root.rightNode,root.rightNode.value,newValue)
            }else{
                root.rightNode = {
                    value:newValue
                }
            }
        }
    }
    //二叉树小到大排序
    sortMin() {
        this.minArr = []
        this.compareMin(this.objArrTree)
        console.log(this.minArr)
    }
    compareMin(tree) {
        
    }
}

var arrTwo = new TwoForkedTree(arr)
arrTwo.sortMin()