const express = require('express');
const router = express.Router();
const { getAllEmployerApplicationsController, getAllJobSeekerApplicationsController, deleteJobSeekerApplicationsController, createApplicationController } = require('../controllers/applicationController');
const {isAuthorized} = require('../middlewares/auth');

router
.get('/get-employer-applications', isAuthorized, getAllEmployerApplicationsController );

router
.get('/get-jobseeker-applications', isAuthorized, getAllJobSeekerApplicationsController );

router
.delete('/delete-jobseeker-application/:id', isAuthorized, deleteJobSeekerApplicationsController);

router
.post('/create-application', isAuthorized, createApplicationController);

module.exports = router;