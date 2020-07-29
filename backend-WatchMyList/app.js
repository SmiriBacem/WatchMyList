const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const config = require('./DB');

const HttpError= require('./models/http-error');
const userRoutes= require('./route/user-route');
const movieRoute= require('./route/movie-route');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Hanlde CORS ERROR 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
});

app.use('/users',userRoutes);
app.use('/movies',movieRoute);



//HANDLING ROUTES ERROR
app.use((req, res, next)=>{
    const HttpError=new HttpError('Could not find this route.', 404);
        throw HttpError;
})



//ERROR HANDLING MIDDLEWARE
app.use((error, req, res , next)=>{
    if(res.headerSent){
        return next(error);
    } 
    res.status(error.code || 500 );
    res.json({message: error.message || 'An unkown error occured !'});
})

mongoose
    .connect(config.DB, 
        { useNewUrlParser: true, useUnifiedTopology:true })
    .then(
    () => { 
            console.log('Database is connected');
            app.listen(5000); 
        }
   
    ).catch( err => { console.log('Can not connect to the database' + err) })
