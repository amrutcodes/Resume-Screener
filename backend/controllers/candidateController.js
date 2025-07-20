const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Candidate = require('../schemas/candidateSchema');
const Job = require('../schemas/jobSchema');
const extractTextFromResume = require('../utils/extractTextFromResume');
const screeningLogic = require('../utils/screeningLogic');

// POST /api/candidates/upload/:jobId
const uploadAndScreenCandidate = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const { name, email } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Resume file is required' });
  }

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  const resumeText = await extractTextFromResume(req.file.buffer, req.file.mimetype);
  const { score, keywordsMatched } = screeningLogic(resumeText, job.keywords);

  const candidate = await Candidate.create({
    name,
    email,
    resumeText,
    score: isNaN(score) ? 0 : score,
    keywordsMatched,
    jobId
  });

  res.status(201).json({
    success: true,
    message: 'Resume submitted and scored',
    candidateId: candidate._id,
    score,
    keywordsMatched
  });
});

// GET /api/candidates/getAllCandidates
const getAllCandidates = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find()
    .populate('jobId', 'title')
    .sort({ createdAt: -1 });

  const formatted = candidates.map(c => ({
    _id: c._id,
    name: c.name,
    email: c.email,
    score: c.score,
    jobTitle: c.jobId?.title || 'N/A',
    keywordsMatched: c.keywordsMatched,
    createdAt: c.createdAt,
  }));

  res.status(200).json({ success: true, data: formatted });
});

// GET /api/candidates/getCandidateById/:id
const getCandidateById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid candidate ID' });
  }

  const candidate = await Candidate.findById(id).populate('jobId', 'title');

  if (!candidate) {
    return res.status(404).json({ success: false, message: 'Candidate not found' });
  }

  res.status(200).json({ success: true, data: candidate });
});

module.exports = {
  uploadAndScreenCandidate,
  getAllCandidates,
  getCandidateById
};
