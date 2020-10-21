
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const config = require('config')
const auth = require('../middleware/auth')

const { User, validateRegister,validateLogin } = require('../models/user')
const checkToken = require('../checkToken')
const bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
const salt = 10;
const jwt = require('jsonwebtoken')

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user)
})

router.post('/register', async (req,res)=>{
    const { error } = validateRegister(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered')

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save()

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
    
    // bcrypt.hash(req.body.password, salt, (err, encrypted) => {
    //     req.body.password = encrypted
    //     const newItem = new User({
    //         name:req.body.name,
    //         email:req.body.email,
    //         address:req.body.address,
    //         password:encrypted,
    //     });
    //     newItem.save().then((result)=>{
    //         jwt.sign({result},jwtKey,{expiresIn: '300s'},(err,token)=>{
    //             res.status(201).json({token})
    //         })
    //     })
    //         .catch(err=>res.status(404).json({success:false}));
    // })
});

router.post('/login', async (req, res) => {
    const { error } = validateLogin(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password')

    // user = new User(_.pick(req.body, ['name', 'email', 'password']));
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);
    // await user.save()
    const token = user.generateAuthToken();
    res.send({token: token })

    // const {error} = validateUserLogin(req.body)
    // if(error) return res.status(400).send(error.details[0].message)
    // User.findOne({email:req.body.email}).then(data=>{
    //     bcrypt.compare(req.body.password, data.password, function (err, result) {
    //         if (result == true) {
    //             jwt.sign({data},jwtKey,{expiresIn: '500s'},(err,token)=>{
    //                 res.status(200).json({token:token,user_data:data})
    //             })
    //         } else {
    //             res.send('Incorrect password')
    //         }
    //     })
    // }).catch(err=>{console.log(err);res.status(404).json({message:'Email not found'})})
});

// router.get('/users',checkToken,(req,res)=>{
//     User.find().then(posts=>res.status(200).json(posts)).catch(err=>console.log(err))
// });

// validateUserRegister=(user)=>{
//     const schema = Joi.object({
//         name:Joi.string().min(4).required(),
//         email: Joi.string().email({ tlds: { allow: false } }).required(),
//         address:Joi.string().required(),
//         password:Joi.string().required(),
//     });
//     return schema.validate(user);
// };

validateUserLogin=(user)=>{
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password:Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = router