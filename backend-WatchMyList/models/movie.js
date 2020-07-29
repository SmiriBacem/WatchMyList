const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movieSchema=new Schema({
    name:{
        type : String,
        required:true,
    },
    movieDBid:{
        type:Number,
        required:true,
    },
    tag : {
        type:String,
        required:true,
        minlength: 6
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
});


module.exports = mongoose.model('Movie', movieSchema);