const HttpError=require('../models/http-error');
const {validationResult} = require('express-validator')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')


const User = require('../models/user');



const getUsersmovies=async  (req,res,next)=>{
    const { userId } =  req.params;
    let users;
    try{
        users = await User.findById(userId);
    }catch(err){
        const error=new HttpError('Fetching users failed, Please try again ',500);
        return next(error);
    }
    res.json({users:users.map(u => u.toObject({getters : true}))});
}

const signup= async (req,res,next)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check your data.',422));
    }

    const { name, email , password } = req.body;
    
    let existingUser;
    try{
        existingUser= await User.findOne({email});
    }catch(err){
        const error=new HttpError('signup failed, Please try again ',500);
        return next(error);
    }

    if(existingUser){
        const error=new HttpError('User exists already, please login instead.',422);
        return next(error);
    }

    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 12)
    }catch(err){
        const error=new HttpError('could not hash password, please tray again.',422);
        return next(error); 
    }
    

    const  createUser =new User({ 
        name,
        email,
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/600px-User_icon_2.svg.png',
        password:hashedPassword,
        list:[]
    })
    try{
        await createUser.save();
    }catch(err){
        const error=new HttpError('signup failed, Please try again .',500);
        return next(error);
    }

    let token;
    try{
        token = jwt.sign({userId : createUser.id, email : createUser.email}, 
            'jwt_token',
            { expiresIn:'1h' }
            );
    }catch(err){
        const error=new HttpError('Sigining up failed, Please try again .',500);
        return next(error);
    }


    res.status(201)
    .json({user:createUser.id, email: createUser.email, token:token});
}
const getOneUser= async (req,res,next)=>{
    const userId=req.params.uid;
    let user
    try{
        user = await User.findById(userId); 

    }catch(err){
        const error=new HttpError('Get user failed, Please try again .',500);
        return next(error);
    }
    if(!user){
        const error=new HttpError('User not found, Please try again .',500);
        return next(error);
    }
    res.status(200).json({user});
};

const login= async (req,res,next)=>{
    const {email, password} = req.body;
    let existingUser;
    try{
        existingUser= await User.findOne({email});
    }catch(err){
        const error=new HttpError('Logging in failed, Please try again ',500);
        return next(error);
    }

    let isValidPassword=false;
    try{
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    }catch(err){
        const error=new HttpError('Could not log you in, Please check your credentienls ',500);
        return next(error);  
    }
    

    if(!existingUser ){
        const error=new HttpError('Invalid credentials, could not login in.',422);
        return next(error);
    }

    if(!isValidPassword){
        const error=new HttpError('Invalid credentials, could not log you in ',401);
        return next(error);
    }

    let token;
    try{
        token = jwt.sign({userId : existingUser.id, email : existingUser.email}, 
            'jwt_token',
            { expiresIn:'1h' }
            ); 
    }catch(err){
        const error=new HttpError('logining in failed, Please try again .',500);
        return next(error);
    }

    res.json({
    name:existingUser.name,
    userId: existingUser.id,
    email:existingUser.email,
    token:token
    });
};



exports.signup=signup;
exports.getUsersmovies=getUsersmovies;
exports.getOneUser=getOneUser;
exports.login=login;