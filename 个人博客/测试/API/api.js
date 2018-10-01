let express = require('express')
let fs = require('fs')
module.exports = (app)=>{
  app.use(express.static('public'))
  app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
  })
  app.get('/Admin',(req,res)=>{
    fs.readFile(__dirname + '/Admin.html',(err,data)=>{
      if(err){
        console.log(err)
      }
      else{
        res.send(data)
      }
    })
  })
}
