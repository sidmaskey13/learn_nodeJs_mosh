const checkUrl = function(req,res,next){
    console.warn('Current route is',req.originalUrl)
    next();
};

module.exports= checkUrl