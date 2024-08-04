const mongoose = require('mongoose');
const validator = require('validator');


const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please enter your name'],
        minLength: [5, 'Name must be at least 5 characters long'],
        maxLength: [50, 'Name cannot exceed 50 characters']
    },
    email:{
        type:String,
        required: [true, 'Please enter email'],
        validate: [validator.isEmail, 'Please enter valid email']
    },
    phone:{
        type:String,
        required: [true, 'Please enter phone number'],
    },
    coverLetter:{
        type:String,
        required: [true, 'Please enter cover letter'],
    },
    address:{
        type:String,
        required: [true, 'Please enter address'],
      
    
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    applicantId:{
        user:{

            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },

        role:{
            type:String,
            enum: ['Job Seeker'],
            required: true
        }
    },
    
    employerId:{
        user:{
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },

        role:{
            type:String,
            enum: ['Employer'],
            required: true
        }
    }

}); 

module.exports = mongoose.model('Application', applicationSchema);