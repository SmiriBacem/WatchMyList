const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');
const { schema } = require('./movie');
const Schema = mongoose.Schema;


const userSchema=new Schema({
    name:{
        type : String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true,
        minlength: 6
    },
    image:{
        type:String,
        required:true,
    },
    list:[{
        type:Schema.Types.ObjectId,
        ref:'Movie'
    }]
});

userSchema.plugin(UniqueValidator);

module.exports = mongoose.model('User', userSchema);