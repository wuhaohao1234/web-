setTimeout(() => {
    console.log('我是setTimeout')   
});

function fn() {
    return new Promise((resolve,reject)=>{
        console.log('我是promise')
        if(true){
            resolve('我是then函数')
        }
    })
}
fn().then((data)=>{
    console.log(data)
})
console.log('我是宏任务')
