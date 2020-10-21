// var fs = require('fs');
// var rs = fs.createReadStream('./text.txt')
// rs.on('open',function () {
//     console.log('Demo file is open')
// })

var events = require('events')
var eventEmitter = new events.EventEmitter();
//Listener
eventEmitter.on('Logged',(arg)=>{
    console.log('Message called ',arg)
});
eventEmitter.on('Login',(arg)=>{
    console.log('Message called ',arg)
});

//raise event
eventEmitter.emit('Logged',{id:1,url:'sawd'})
eventEmitter.emit('Login',{message:'No username provided'})


