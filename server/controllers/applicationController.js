const {catchAsyncError} = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../middlewares/error');
const applicationModel = require('../models/applicationModel');
const cloudinary = require('cloudinary');
const jobModel = require('../models/jobModel');


exports.getAllEmployerApplicationsController = catchAsyncError( async (req, res, next) =>{

    const { role } = req.user;
    if(role !== 'Employer'){
        return next(new ErrorHandler('Only employers can view applications', 400));
    }

    const employerId = req.user._id;
    const applications = await applicationModel.find({'employerId.user': employerId});
    if(applications.length >= 0){
        res.status(200).json({
            status:"success",
            applications
        });
    }
    else{
        return next(new ErrorHandler('No applications found', 404));
    }
    next();
});

exports.getAllJobSeekerApplicationsController = catchAsyncError( async (req, res, next) =>{

    const { role } = req.user;
    if(role !== 'Job Seeker'){
        return next(new ErrorHandler('Only Job Seekers can view applications', 400));
    }

    const applicantId = req.user._id;
    const applications = await applicationModel.find({'applicantId.user': applicantId});
    if(applications.length >= 0){
        res.status(200).json({
            status:"success",
            applications
        });
    }
    else{
        return next(new ErrorHandler('No applications found', 404));
    }
    next();
});

exports.deleteJobSeekerApplicationsController = catchAsyncError( async (req, res, next) =>{
    const { role } = req.user;
    if(role !== 'Job Seeker'){
        return next(new ErrorHandler('Only Job Seekers can delete their applications', 400));
    }

   const applicationId = req.params.id;
   console.log(applicationId);
    await applicationModel.findByIdAndDelete(applicationId);
    res.status(200).json({
        status:"success",
        message:"Application deleted successfully"
    });
    
    next();
});

exports.createApplicationController = catchAsyncError( async (req, res,next) =>{
    const { role} = req.user;
    if(role !== 'Job Seeker'){
        return next(new ErrorHandler('Only Job Seekers can apply for jobs', 400));
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler('Please upload a resume', 400));
    }
    const { resume } = req.files;
    const allowedFormats = ['image/jpeg', 'image/png', 'img/webp'];

    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler('Invalid file input. Please upload your resume in a PNG, JPG or WEBP format', 400));
    }


    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);
    console.log(cloudinaryResponse);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        return next(new ErrorHandler('Error uploading resume', 500));
    }


    const { name, email, coverLetter, phone, address, jobId} = req.body;
    const applicantId = {
        user: req.user._id,
        role: req.user.role
    }

    const jobDetails = await jobModel.findById(jobId);
    if(!jobDetails){
        return next(new ErrorHandler('Job not found', 404));
    }

    const employerId = {
        user: jobDetails.jobPostedBy,
        role: 'Employer'
    }

    if(!name || !email || !phone || !coverLetter || !address){
        return next(new ErrorHandler('Please fill in all fields', 400));
    }

    const application = await applicationModel.create({
        name,
        email,
        phone,
        address,
        coverLetter,
        applicantId,
        employerId,
        jobId,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });

    res.status(201).json({
        status:"success",
        message:"Application submitted successfully",
        application
    });

    next();

});