const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { catchAsyncError } = require('../middlewares/catchAsyncError'); 
const ErrorHandler = require('../middlewares/error');

exports.isAuthorized = catchAsyncError(async (req, res, next) =>{
    const { token } = req.cookies;
    
    if(!token){
        return next(new ErrorHandler('User not authorized. Login before accessing this resource.', 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET );
    console.log(decoded); //The decoded object will contain the user id
    req.user = await userModel.findById(decoded.id); //The user object will be available in the request object

    next();
})