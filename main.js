// const http = require('http')

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.write('Hello World!');
//     res.end();
// })

// server.listen(3000, () => {
//     console.log('listening on port 3000')
// })

const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data=[
        {name:"Sid",age:22,address:"Baneshwor"},
        {name:"Sid",age:22,address:"Baneshwor"},
        {name:"Sid",age:22,address:"Baneshwor"},
        ]
    res.write(JSON.stringify(data));
    res.end();
})

app.get('/hello', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write('Hello Chelsea lost');
    res.end();
})

app.listen(port, () => {
    console.log('listening on port 3000')
})

var other=require('./other')
console.log(other(10,20))