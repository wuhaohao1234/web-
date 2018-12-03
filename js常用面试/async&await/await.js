const fs = require('fs')
// 解决一个异步代码的执行过程,可以准确的得到异步代码的执行结果
function readTxt() {
    return new Promise((resolve,reject)=>{
        fs.readFile('./aaa.txt', 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
var txt
async function fn() {
    //awati就是接收readTxt里面的resolve的值,千万记得它觉得不是异步的，它实际上是微任务
    txt = await readTxt()    
    console.log(txt)
}
fn()