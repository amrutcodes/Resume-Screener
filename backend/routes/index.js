const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const jobRoutes = require('./jobRoutes');
const candidateRoutes = require('./candidateRoutes');

router.use('/user', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/candidates', candidateRoutes);

module.exports = router;
