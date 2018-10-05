let express = require('express')
let APIControllers = require('./controllers/APIControllers')
let app = express()

app.use(express.static('./public'))
app.set('view engine', 'ejs');
APIControllers(app)

app.listen(3001,()=>{
  console.log('the server listen 3001')
})
