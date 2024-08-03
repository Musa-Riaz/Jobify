const express = require('express');
const router = express.Router();
const {registerUserController, loginUserController, logoutController} = require('../controllers/userController');


router
.post('/register', registerUserController);

router
.post('/login', loginUserController);

router
.get('/logout', logoutController);


module.exports = router;