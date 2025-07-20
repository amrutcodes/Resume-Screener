const express = require('express');
const multer = require('multer');
const {
  uploadAndScreenCandidate,
  getAllCandidates,
  getCandidateById,
} = require('../controllers/candidateController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload/:jobId', upload.single('resume'), uploadAndScreenCandidate);
router.get('/getAllCandidates', getAllCandidates);
router.get('/getCandidateById/:id', getCandidateById);

module.exports = router;
