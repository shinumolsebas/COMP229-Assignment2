var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage );

/* GET home page. */
router.get('/home', indexController.displayHomePage );

/* GET about page. */
router.get('/about', indexController.displayAboutPage );

/* GET projects page. */
router.get('/projects', indexController.displayProjectsPage );

/* GET services page. */
router.get('/services', indexController.displayServicesPage );

/* GET contact page. */
router.get('/contact', indexController.displayContactPage );

/* GET Login page. */
router.get('/login', indexController.displayLoginPage );

/*POST route for processing Login page. */
router.post('/login', indexController.processLoginPage );

/* GET Register page. */
router.get('/register', indexController.displayRegisterPage );

/*POST route for processing Register page. */
router.post('/register', indexController.processRegisterPage );


/*POST route for logout page. */
router.post('/logout', indexController.performLogout );


module.exports = router;
