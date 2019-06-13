var express = require('express');
var E = express.Router();

const eventController = require('../eventController');

E.get('/',eventController.getAllEvents,(req,res)=>{
    console.log('/events');
    if(res.locals.err){
        console.log(res.locals.err);
        res.status(501).json("DB Error")
    }
   
    res.json(res.locals.data);
})

E.get('/avg',eventController.getAverage,(req,res)=>{
    console.log('/events/avg');
    if(res.locals.err){
        console.log(res.locals.err);
        res.status(501).json("Error - Try again later")
    }
    res.json(res.locals.average)
})


module.exports = E;
