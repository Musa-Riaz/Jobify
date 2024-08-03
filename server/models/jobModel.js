const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please enter job title'],
        minLength: [5, 'Job title must be at least 5 characters long'],
        maxLength: [100, 'Job title cannot exceed 100 characters']
    },
    description:{
        type:String,
        required: [true, 'Please enter job description'],
        minLength: [5, 'Job description must be at least 5 characters long'],
        maxLength: [1000, 'Job description cannot exceed 1000 characters']
    },
    category:{
        type:String,
        required: [true, 'Please enter job category'],
        
    },
    country:{
        type:String,
        required: [true, 'Please enter country'],
        
    
    },
    city:{
        type:String,
        required: [true, 'Please enter city'],
        
    
    
    },
    address:{
        type:String,
        required: [true, 'Please enter address'],
        minLength: [15, 'Address must be at least 15 characters long'],

    },
    fixedSalary:{
        type: Number,
        minLength: [4, 'Fixed salary must be at least 4 digits long'],
        maxLength: [9, 'Fixed salary cannot exceed 9 digits']
    },
    salaryFrom:{
        type:Number,
        minLength: [4, 'Salary From must be at least 4 digits long'],
        maxLength: [9, 'Salary From cannot exceed 9 digits']
    },
    salaryTo:{
        type:Number,
        minLength: [4, 'Salary To must be at least 4 digits long'],
        maxLength: [9, 'Salary To cannot exceed 9 digits']
    
    },
    expired:{
        type: Boolean,
        default: false
    },
    jobPostedOn:{
        type: Date,
        default: Date.now
    },
    jobPostedBy:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }

});

module.exports = mongoose.model('Job', jobSchema);