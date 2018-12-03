/*
//最简单的同步代码
function fn(){
    return '我是同步的，我会阻塞下面代码的运行'
}
// fn会阻塞下面代码的运行
console.log(fn())

console.log('我被阻塞')
------------------------------------------------------
// 异步代码async
async function fn() {
    if(true){
        return '我是成功的,我不会阻塞下面代码的运行'
    }
}
fn().then(data=>console.log(data))
console.log('我不会被阻塞')
*/