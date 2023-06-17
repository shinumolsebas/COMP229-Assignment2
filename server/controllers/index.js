let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create the user model instance
let userModel = require('../models/user');
let User = userModel.User; //alias

module.exports.displayHomePage=(req,res,next)=>{
    res.render('index', { title: 'Home' });   
}
module.exports.displayAboutPage=(req,res,next)=>{
    res.render('about', { title: 'About Me'});   
}
module.exports.displayProjectsPage=(req,res,next)=>{
    res.render('projects', { title: 'Projects' }); 
}
module.exports.displayServicesPage=(req,res,next)=>{
    res.render('services', { title: 'Services'  });
}
module.exports.displayContactPage=(req,res,next)=>{
    res.render('contact', { title: 'Contact Me' });
}


module.exports.displayLoginPage = (req,res,next)=>{
   //check if user is already logged in

   if(!req.user) 
   {
    res.render('auth/login',
    {
        title : "Login",
        messages : req.flash('loginMessage'),
        displayName: req.user ? req.user.displayName : ''
    });

   }

   else
   {
      return res. redirect('/');
   }
}


module.exports.processLoginPage = (req, res, next)=> {
    passport.authenticate('local',
    (err, user,info) => {
        //server err

        if(err)
        {
            return next(err);
        }
        
        //user login err
        if(!user){
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user,(err)=>{
            //server err
            if(err)
            {
                return next(err);
            }
            return res.redirect('/business-list');


        });

    })(req,res,next);

    
}

module.exports.displayRegisterPage = (req,res,next) => {
    //check if user is not already logged in
    if(!req.user) 
    {

      res.render('auth/register',
     {
         title : "Register",
         messages : req.flash('registerMessage'),
         displayName: req.user ? req.user.displayName : ''
     });
    }

    else

    {
      return res. redirect('/');
    }
 
}

 module.exports.processRegisterPage = (req,res,next) => {
    //initialise an user object
    let newUser = new User({
        username : req.body.username,
        email : req.body.email,
        displayName : req.body.displayName

    });

    User.register(newUser,req.body.password,(err) => {
    if(err)
    {
        console.log(err);
        if(err.name == 'UserExistsError')
        {
            req.flash(
                'registerMessage',
                'Registration Error : User Already Exists!'

            );
        console.log('Error : User Already Exists!');
        
       }

        return res.render('auth/Register',
        {
            title : "Register",
            messages : req.flash('registerMessage'),
            displayName : req.user ? req.user.displayName : ''
        });
    }
    else
    {
        //if registration is success
        return passport.authenticate('local')(req,res,() => {

        req.redirect('/business-list')
        });
        
    }
    
   });
    
      
}

module.exports.performLogout = (req, res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            //handle err here
            console.log(err);
            return next (err);
        }
      return res.redirect('/');
    })

}
