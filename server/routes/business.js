let express =require('express');
let router =express.Router();
let mongoose =require('mongoose');

//connect to Business Model

let Business =require('../models/business');

//Get route for business list page -- READ operation

router.get('/', async(req,res,next)=>{
    try{
        let businessList = await Business.find();
       // console.log(businessList);
        res.render('business/list', {title: 'Business', BusinessList: businessList});
    } 
    catch(err){
        console.log(err);
    }
});

// Get Route for th Add page-CREATE operation

//Post Route for processing the Add page - CREATE operation

//Get Route for displaying the Edit page -UPDATE operation

router.get('/edit/:id', async(req,res,next)=>{
    let id = req.params.id;

    try{
        let businessToEdit = await Business.findById(id);
        res.render('business/edit',{title:'Edit Business', business:businessToEdit});
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }

});
//Post Route for processing the Edit page-UPDATE operation
router.post('/edit/:id', async(req,res,next)=>{
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

});

router.get('/delete/:id', async(req,res,next)=>{
    let id = req.params.id;
    try{
        await Business.findByIdAndRemove(id);
        res.redirect('/business-list');
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }

});


//Get to confirm Deletion -DELETE operation
router.get('/delete/:id', async(req,res,next)=>{
    let id = req.params.id;
    try{
        await Business.findByIdAndRemove(id);
        res.redirect('/business-list');
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }

});
module.exports=router;