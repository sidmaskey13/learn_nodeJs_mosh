const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Joi = require('joi');
const bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies

//index
router.get('/',(req,res)=>{
    Post.find().then(posts=>res.status(200).json(posts))
});

//show
router.get('/:id',(req,res)=>{
    Post.find({_id:req.params.id}).then(post=>res.status(200).json(post)).catch(err=>res.status(404).json({success:false,message:"Id not found"}))
});

//create
router.post('/',(req,res)=>{
    const {error} = validatePost(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const newItem = new Post({
        title:req.body.title,
        body:req.body.body,
    });
    newItem.save().then((result)=>res.status(201).json({success:true,result:req.body}))
        .catch(err=>res.status(404).json({success:false}));

});

//edit
router.put('/:id',(req,res)=>{
    Post.find({_id: req.params.id}).catch(err=>res.status(404).json({success:false,message:"Id not found"}))
    const {error} = validatePost(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    Post.updateOne({_id: req.params.id},{
        title:req.body.title,
        body:req.body.body,
    }).then((result)=>res.status(201).json({success:true,result:req.body}))
        .catch(err=>res.status(404).json({success:false}));
});

//delete
router.delete('/:id',(req,res)=>{
    Post.findById(req.params.id).then(post=>post.remove(post).then(()=>res.status(200).json({success:true}))).catch(err=>res.status(404).json({success:false,message:"Id not found"}))
});

//search
router.get('/search/:name',(req,res)=>{
    var regex = new RegExp(req.params.name,'i');
    Post.find({title:regex}).then(result=>{res.status(200).json(result)}).catch(err=>res.status(404).json({success:false}));
});

//validation
validatePost=(post)=>{
    const schema = Joi.object({
        title: Joi.string() .min(6) .required(),
        body: Joi.string(),
    });
    return schema.validate(post);
};


module.exports = router