const express = require('express');
const app = express()
const router = express.Router();

const checkUrl = require('./middleware')
// app.use(checkUrl);

app.get('/',(req,res)=>{
    res.send('Home Page')
})
router.get('/login',checkUrl,(req,res)=>{
    res.send('Login Page')
})
app.get('/about',(req,res)=>{
    res.send('About page')
})
app.get('/admin',(req,res)=>{
    res.sendFile(__dirname+'/admin.html')
})
app.use('/',router)
app.listen(3000)