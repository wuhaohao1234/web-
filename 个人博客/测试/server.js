let express = require('express')
let cors = require('cors')
let api = require('./API/api.js')

let app = express()
app.use(cors())
api(app)

app.listen(3001,()=>{
  console.log('the server listen 3001')
})
