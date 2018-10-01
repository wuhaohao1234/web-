let bodyParser = require('body-parser')
let arr = []
module.exports = (app)=>{
  app.use(bodyParser.urlencoded({extend:false}))
  app.get('/todo',(req,res)=>{
    res.render('todo')
  })
  app.post('/todo',(req,res)=>{
    arr.push(req.body)
    console.log(arr)
    res.send(arr)
  })
}
