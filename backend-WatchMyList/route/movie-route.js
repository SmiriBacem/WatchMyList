const express=require('express');
const movieController= require('../controllers/movie-Controller');
const { check } = require('express-validator');
const router=express.Router();
//const checkAuth = require('../helpers/check-auth');


router.post('/createlist',movieController.createMovie);
router.get('/:uid',movieController.getUserMovies);


//MIDDELWARE TO CHECK IF USER IS AUTHETICATED OR NOT 
//router.use(checkAuth);

module.exports=router; 