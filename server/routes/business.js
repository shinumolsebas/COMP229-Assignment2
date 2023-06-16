let express =require('express');
let router =express.Router();
let mongoose =require('mongoose');

//connect to Business Model

let Business =require('../models/business');

//Get route for business list page

router.get('/', async(req,res,next)=>{
    try{
        let businessList = await Business.find();
       // console.log(businessList);
        res.render('business', {title: 'Business List', BusinessList: businessList});
    } 
    catch(err){
        console.log(err);
    }
});

module.exports=router;