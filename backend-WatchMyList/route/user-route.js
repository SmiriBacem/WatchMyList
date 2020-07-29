const express=require('express');
const usersController= require('../controllers/users-controller');
const { check } = require('express-validator');
const router=express.Router();
//const checkAuth = require('../helpers/check-auth');

//router.get('/',usersController.getUsers);

router.get('/:uid',usersController.getUsersmovies);

router.post('/singup',
    [
    check('email').normalizeEmail().isEmail(),
    check('name').not().isEmpty(),
    check('password').isLength({ min : 6}),
    ],
    usersController.signup);
router.post('/login',usersController.login);

//MIDDELWARE TO CHECK IF USER IS AUTHETICATED OR NOT 
//router.use(checkAuth);

module.exports=router; 