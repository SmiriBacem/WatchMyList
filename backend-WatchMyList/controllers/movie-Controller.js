const HttpError=require('../models/http-error');
const {validationResult}=require('express-validator');
const mongoose  = require('mongoose');

const Movie = require('../models/movie');
const User = require('../models/user');


const createMovie = async(req,res,next)=>{
    //const {userId}=req.params;
    const {owner}=req.body;
    let newMovie=new Movie(req.body);
    let user;
    try{
        user= await User.findById(owner);
    }catch(err){
        const error=new HttpError('cannot fined user',404)
        return next(error);
    }
    newMovie.owner = user;
    try{
        await newMovie.save();
    }catch{
        const error=new HttpError('cannot add movie',500)
        return next(error);
    }
    
    user.list.push(newMovie);
    try{
        await user.save();
    }catch{
        const error=new HttpError('cannot add user',500)
        return next(error);
    }
    
    res.status(201).json(user);
}

const getUserMovies= async(req,res,next)=>{
    const { uid }=req.params;
    
    let user=new User();

    try{
         user= await User.findById(uid).populate('list');
    }catch(err){
        const error=new HttpError('cannot fined user',404)
        return next(error);
    }
    res.status(200).json(user); 
}

exports.createMovie=createMovie;
exports.getUserMovies=getUserMovies;


