let express = require('express')
let cors = require('cors')
let app = express()
app.use(cors())
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials','true');
//     next();
// };

// app.use(allowCrossDomain)


app.get('/',(req,res)=>{
  res.send('ok')
})

app.listen(3000,()=>{
  console.log('the server listen 3000')
})
