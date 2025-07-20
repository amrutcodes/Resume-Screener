const express = require('express');
const {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobCount,
} = require('../controllers/jobController');

const router = express.Router();

// Admin routes
router.post('/create', createJob);       
router.post('/update/:id', updateJob);             
router.delete('/delete/:id', deleteJob); 
router.get('/getJobCount', getJobCount);        

// Public route
router.get('/getAllJobs', getAllJobs);              

module.exports = router;
