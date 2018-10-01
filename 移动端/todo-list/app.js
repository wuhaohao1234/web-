let express = require('express')
let todoController = require('./controllers/todoController')
let app = express()

app.set('view engine','ejs')

todoController(app)
app.listen(3000,()=>{
  console.log('the server listen 3000')
})
