const {catchAsyncError} = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../middlewares/error');
const jobModel = require('../models/jobModel');

exports.getAllJobsController = catchAsyncError ( async (req, res, next) =>{
    const jobs = await jobModel.find({expired: false});
    if(jobs.length >= 0){
        res.status(200).json({
            success: true,
            jobs
        });
    }
    else{
        return next(new ErrorHandler('No jobs found', 404));
    }
});


exports.jobPostingController = catchAsyncError( async (req, res, next) =>{

    const {role} = req.user;
    if(role !== 'Employer'){
        return next(new ErrorHandler('Only employers can post jobs', 400));
    }

    const {title, description, category, country, city, address, fixedSalary, salaryFrom, salaryTo} = req.body;

    if(!title || !description || !category || !country || !city || !address){
        return next(new ErrorHandler('Please enter all the fields', 400));
    }

    if((!fixedSalary && !salaryFrom) && !salaryTo){
        return next(new ErrorHandler('Please enter salary', 400));
    }

    if(fixedSalary && salarFrom && salaryTo){
        return next(new ErrorHandler('Please enter only one salary', 400));
    }

    const postedBy = req.user._id;
    console.log(postedBy);
    const job = await jobModel.create({
        title,
        description,
        category,
        country,
        city,
        address,
        fixedSalary,
        salaryFrom,
        salaryTo,
        jobPostedBy: postedBy
    
    });
    res.status(201).json({
        status:"success",
        message:"Job posted successfully",
        job
    })

    next();

});


exports.getMyJobsController = catchAsyncError( async (req, res, next) =>{
    const { role } = req.user;
    if(role !== "Employer"){
        return next (new ErrorHandler('Only employers can view their jobs', 400));
    }

    const jobs = await jobModel.find({jobPostedBy: req.user._id});
    res.status(200).json({
        status:"success",
        jobs
    });

    next();
});

exports.updateJobController = catchAsyncError ( async (req, res, next) =>{
    const { role } = req.user;
    if(role !== "Employer"){
        return next (new ErrorHandler('Only employers can update their jobs', 400));
    }

    const { id }  = req.params;
    if(!id){
        return next(new ErrorHandler('Please enter job id', 400));
    }

    const {title, description, category, country, city, address, fixedSalary, salaryFrom, salaryTo} = req.body;
    const job = await jobModel.findByIdAndUpdate(id, {
        title,
        description,
        category,
        country,
        city,
        address,
        fixedSalary,
        salaryFrom,
        salaryTo
    }, {new: true, runValidators: true});
    if(!job){
        return next(new ErrorHandler('Oops! Job not found', 404));
    }
    else{
        res.status(200).json({
            status:"success",
            message:"Job updated successfully",
            job
        });
    }
   
    next();
});


exports.jobDeleteController = catchAsyncError(async (req, res, next) =>{
    const { role }  = req.user;
    if(role !== "Employer"){
        return next(new ErrorHandler('Only employers can delete their jobs', 400));
    }

    const {id} = req.params
    const job = await jobModel.findByIdAndDelete(id);
    res.status(200).json({
        status:"success"
    });
});


exports.getSingleJobController = catchAsyncError( async (req, res , next) =>{
    try{
        const {id} = req.params;
        const job = await jobModel.findById(id);
        if(!job){
            return  next (new ErrorHandler('Job not found', 404));
        }
        res.status(200).json({
            status:"success",
            job
        
        });
    }

    catch(err){
        console.log(err);
        return next (new ErrorHandler('Error in ID / Cast Error', 404));
    }
})