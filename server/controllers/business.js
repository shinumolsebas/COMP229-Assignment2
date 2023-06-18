let express =require('express');
let router =express.Router();
let mongoose =require('mongoose');


//connect to Business Model

let Business =require('../models/business');



module.exports.displayBusinessList = async(req,res,next)=>{
    try{
        let businessList = await Business.find();
       // console.log(businessList);
        res.render('business/list', 
        {
        title: 'Business', 
        BusinessList: businessList,
        displayName: req.user ? req.user.displayName : '' })
    } 
    catch(err){
        console.log(err);
    }
};
module.exports.displayEditPage =async(req,res,next)=>{
    let id = req.params.id;

    try{
        let businessToEdit = await Business.findById(id);
        res.render('business/edit',{
            title:'Edit Business', 
            business:businessToEdit ,
            displayName: req.user ? req.user.displayName : ''});
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }

};

module.exports.processEditPage =async(req,res,next)=>{
    let id = req.params.id;

    let updatedBusiness={
        "Name":req.body.name,
        "Phone": req.body.phone,
        "Email":req.body.email
    };
    try{
        await Business.updateOne({_id:id}, updatedBusiness);
        res.redirect('/business-list');
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }

};

module.exports.performDelete = async(req,res,next)=>{
    let id = req.params.id;
    try{
        await Business.findByIdAndRemove(id);
        res.redirect('/business-list');
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }

};