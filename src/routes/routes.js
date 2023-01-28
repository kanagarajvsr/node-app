const router = require('express').Router();
const { decode: verifyToken } = require('../utils/token'); 

// import controllers review, products
const authController = require('../controllers/auth.controller');
const organizationController = require('../controllers/organizationController');
const branchController = require('../controllers/branchController');
const rolesController = require('../controllers/roleController');
const userController = require('../controllers/userController');


//router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
   
router.use(function(req,res,next){
    var bearerHeader=req.body.authorization || req.headers['authorization'];
    if(typeof bearerHeader !=="undefined"){
        const token = bearerHeader.split(" ")[1];
        if(token){
           const validToken = verifyToken(token);
           if(typeof validToken !=="undefined"){
                process.data =validToken.data;
                next();
            }else{
                res.status(500).send('Invalid token');
            } 
        }else{
            res.send('Please send a Bearer token')
        }
    }else{
        res.send('Please send a authorization Bearer')
    }
})

//Routers for organization
router.post('/organization', organizationController.addOrganization);
router.put('/organization/:id', organizationController.updateOrganization);
router.get('/organization', organizationController.getAllOrganizations);
router.get('/organization/:id', organizationController.getOneOrganization);
router.delete('/organization/:id', organizationController.deleteOrganization);

//Routers for branch
router.post('/branch', branchController.addBranch);
router.put('/branch/:id', branchController.updateBranch);
router.get('/branch', branchController.getAllBranch);
router.get('/branch/:id', branchController.getOneBranch);
router.delete('/branch/:id', branchController.deleteBranch);

//Routers for roles
router.post('/roles', rolesController.addRole);
router.put('/roles/:id', rolesController.updateRole);
router.get('/roles', rolesController.getAllRole);
router.get('/roles/:id', rolesController.getOneRole);
router.delete('/roles/:id', rolesController.deleteRole);

//Routers for roles
router.post('/user', userController.addUser);
router.put('/user/:id', userController.updateUser);
router.get('/user', userController.getAllUser);
router.get('/user/:id', userController.getOneUser);
router.delete('/user/:id', userController.deleteUser);
  
module.exports = router;