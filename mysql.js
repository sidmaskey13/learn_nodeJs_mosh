
var mysql = require('mysql');
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node',
});
con.connect(function (error) {
    if(error) throw error
    con.query("select * from posts",function (err,result) {
        if(err) throw err
        console.log('Result',result)
    })
    
});