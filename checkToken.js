const jwt = require('jsonwebtoken')
const jwtKey = 'jwt'

const checkToken = function(req,res,next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(" ")
        req.token = token[1]
        jwt.verify(req.token,jwtKey,(err,authData)=>{
            if(err){
                res.json({result:err})
            }
            else{
                next()
            }
        });
    }
    else
    {
        res.send({"Result":"No token provided"})
    }
};

module.exports= checkToken