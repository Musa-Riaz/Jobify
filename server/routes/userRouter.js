const express = require('express');
const router = express.Router();
const {isAuthorized} = require('../middlewares/auth');
const {registerUserController, loginUserController, logoutController, getUserController} = require('../controllers/userController');


router
.post('/register', registerUserController);

router
.post('/login', loginUserController);

router
.get('/logout', logoutController);

router
.get('/get-user',isAuthorized ,getUserController)


module.exports = router;