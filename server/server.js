const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');  
const userRoutes = require('./routes/userRouter');
const applicationRoutes = require('./routes/applicationRouter');
const jobRoutes = require('./routes/jobRouter'); 
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
dotenv.config({path: './config/config.env'});

//Database connection
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
.then(()=> {
    console.log("Connected to the Database")
})
.catch((err) => {
    console.log(err)
})

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());



//Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_APIKEY ,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
});


//Configuring File uploader
app.use(fileUpload({

    useTempFiles : true,
    tempFileDir : '/tmp/'
})
);


//Routes

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/application', applicationRoutes);

//Error handler
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})