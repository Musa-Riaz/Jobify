const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Please enter your name'],
        minLength: [3, 'Name cannot be less than 3 characters'],
        maxLength: [30, 'Name cannot be more than 30 characters']
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    phone:{
        type: Number,
        required: [true, 'Please enter your phone number'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        select: false
    },
    role:{
        type: String,
        required: [true, 'Please enter your role'],
        enum: ['Job Seeker', 'Employer'],

    },
    createdAt:{
        type: Date,
        default: Date.now
    }

}, {timestamps: true});


//Hashing Password

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){ //Checking if the password is modified or not, if it is not modified then we will call the next middleware 
        next();
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword; //Saving the hashed password in the database
    next();
});

//Comparing the password in database with the password the user provided
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


//Generating JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign(
        {id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN}
)
}


module.exports = mongoose.model('User', userSchema);