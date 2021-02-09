
// IMPORT DES SERVICES 
const validate = require('./services/validator') // valide le format des req.body/req.query en s'appuyant sur un schema donné
const adminMW = require('./middleware/adminMW');
// IMPORT DES SCHEMAS
const {userSchema, createdUserSchema} = require('./schemas/userSchema');

// IMPORT DES CONTROLLERS
const userController = require('./controllers/userController');
const tutorialController = require('./controllers/tutorialController');
const materialController = require('./controllers/materialController');
const categoryController = require('./controllers/categoryController');
const jwt = require('./services/jwt')
const multer = require('multer');
const upload = multer();
const {promisify} = require('util');
const pipeline = promisify(require("stream").pipeline);
const fs = require("fs");
const express = require('express');


const Tutorial = require('./models/tutorial');


const router = express.Router();

// ROUTE GET 

// Chargement des 3 derniers tutos
router.get('/home', tutorialController.home)

// Recherche d'un user par son ID
router.get('/admin/user/id/:id', jwt.verifyToken, userController.findOneAdmin);

router.get('/user/:id', jwt.verifyToken, userController.findOne);

// find difficulty and category
router.get('/createTutoList',jwt.verifyToken, tutorialController.createtutoList);


// Recherche d'un tuto par son ID
router.get('/tutorial/:id', tutorialController.findOne);

router.get('/lastTuto', tutorialController.home);
// Get all tutoriels
router.get('/allTuto', tutorialController.findAll);


// Find tutorial by category
router.get('/tutorial/category/:id', tutorialController.findByCategory);

// Recherche d'un materiel par son nom (autoSuggest ? )
// router.get('/material/:name', materialController.findByName); non use

// Find all materials
router.get('/material/findall',jwt.verifyToken,  materialController.findAll);

// ADMIN : All users in DB  A FAIRE
router.get('/admin/users',jwt.verifyToken, userController.findAll);

// ADMIN : Find by mail 
router.get('/admin/user/email/:email', jwt.verifyToken, userController.adminTofindByEmail);

// ADMIN : FIND by nick_name
router.get('/admin/user/nickname/:nick_name', jwt.verifyToken, userController.findByPseudo);

// Find By Nick_Name
router.get('/admin/user/:mail', jwt.verifyToken, userController.findByEmail);

// ADMIN : Find tuto where isShow = false

router.get('/admin/tutoWhoNeedValidate', jwt.verifyToken, tutorialController.tutoWhoNeedValidate);





// ROUTE POST 

//Création d'un user
router.post('/createAccount', userController.createOneUser);

// Création d'un tutorial
router.post('/createTutorial',  tutorialController.createFullTuto);

// Login
router.post('/login',  userController.login);
//logout
// router.post('/logout', jwt.verifyToken, userController.logOut);

// router.post('/admin/login', adminMW, userController.login); non use
router.post("/upload", upload.single("file"), userController.uploadingImage);

// router.post("/uploadTutoImage", upload.single("file"), tutorialController.uploadingTutorialImage);

// ROUTE PUT 
router.put('/updateUser/:id', jwt.verifyToken, userController.updateUser);

//Validate a tutorial isShow = true
router.put('/validateTuto/:id', tutorialController.validateTuto);

// Disabled a tuto isShow = false
router.put('/disabledTuto/:id', tutorialController.desactivate);

router.put('/updateEmail', jwt.verifyToken, userController.updatingEmail);
router.put('/updatePassword', jwt.verifyToken, userController.updatingPassword);
router.put('/updateNickName', jwt.verifyToken, userController.updatingNickname);

// ROUTE DELETE

router.delete('/delete/user/:id',jwt.verifyToken, userController.delete);

router.delete('/delete/tutorial/:id', tutorialController.deleteTuto);


module.exports = router;



// COMMIT FONCTIONNEL MULTER 
// ed8ebd56f8e83770cfb08e266d8050fdd16e5ab2

// CODE A REGARDER PLUS TARD (MULTER)

    // if(file.detectedFileExtension != ".jpg" || file.detectedFileExtension != ".jpeg" || file.detectedFileExtension != ".png"){
    //     console.error("mauvais format", file.detectedFileExtension);
    // }else {

        // await pipeline(file.stream, fs.createWriteStream(`${__dirname}/api/app/public/image/${fileName}.jpg`));
        // await pipeline(file.stream,fs.createWriteStream(`${__dirname}/api/app/public/image/${fileName}.jpg`));
        // response.send(`file uploaded as ${fileName}.jpg`);
    // 