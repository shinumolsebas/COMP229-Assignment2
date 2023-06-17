let express =require('express');
let router =express.Router();
let mongoose =require('mongoose');

let  passport =require('passport');
let busineessController = require('../controllers/business');

// helper function
function requireAuth(req,res,next)
{
   // check if the user logged in
   if (!req.isAuthenticated())
   {
    return res.redirect('/login');
   }
   next();
}

//Get route for business list page -- READ operation

router.get('/', busineessController.displayBusinessList);



//Get Route for displaying the Edit page -UPDATE operation

router.get('/edit/:id', requireAuth, busineessController.displayEditPage);

//Post Route for processing the Edit page-UPDATE operation
router.post('/edit/:id', requireAuth, busineessController.processEditPage);




//Get to confirm Deletion -DELETE operation
router.get('/delete/:id', requireAuth, busineessController.performDelete);

module.exports=router;