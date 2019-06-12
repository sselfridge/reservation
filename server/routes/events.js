var express = require('express');
var E = express.Router();

const eventController = require('../eventController');

E.get('/',eventController.getAllEvents,(req,res)=>{
    if(res.locals.err){
        console.log(res.locals.err);
        res.status(501).json("DB Error")
    }
   
    res.json(res.locals.data);
})


module.exports = E;
