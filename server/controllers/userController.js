const {catchAsyncError} = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../middlewares/error');
const userModel = require('../models/userModel');
const {sendToken} = require('../utils/jwtToken');

exports.registerUserController = async (req, res, next) => {

const {name, role,email, phone, password} = req.body;

if(!name || !email || !phone || !password){
    return next(new ErrorHandler('Please enter all the fields', 400));  

}

const user = await userModel.findOne({email: req.body.email});
if(user){
    return next(new ErrorHandler('User already exists', 400));
}
else{
    const user = await userModel.create(req.body);
    sendToken(user, 201, res, 'User registered successfully');
}
}


exports.loginUserController = catchAsyncError(async (req, res, next) =>{

    const {email, password, role} = req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler('Please enter email, password and role.', 400));
    }

    const user = await userModel.findOne({email: req.body.email}).select('+password');
    if(!user){
        return next (new ErrorHandler('Invalid email or password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    if(user.role !== role){
        return next(new ErrorHandler('Invalid role', 401));
    }

    sendToken(user, 200, res, 'User logged in successfully');
});


exports.logoutController = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        status:'success',
        message: 'Logged out successfully'

    });

    next();

});

exports.getUserController = catchAsyncError(async (req, res, next) =>{

    const user = req.user;
    res.status(200).json({
        status: 'success',
        user
    })
})