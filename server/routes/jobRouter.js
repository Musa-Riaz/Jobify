const express = require('express');
const router = express.Router();
const {isAuthorized} = require('../middlewares/auth');
const { getAllJobsController, jobPostingController, getMyJobsController, updateJobController,jobDeleteController }  = require('../controllers/jobController');

router
.get('/get-all-jobs', getAllJobsController );

router
.post('/job-posting', isAuthorized ,jobPostingController);

router
.get('/get-my-jobs', isAuthorized, getMyJobsController);

router
.put('/update-job/:id', isAuthorized, updateJobController);

router
.delete('/delete-job/:id', isAuthorized, jobDeleteController);

module.exports = router;