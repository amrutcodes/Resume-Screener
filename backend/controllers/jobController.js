const asyncHandler = require('express-async-handler');
const Job = require('../schemas/jobSchema');

// Create a new job
const createJob = asyncHandler(async (req, res) => {
  const { title, description, keywords } = req.body;

  if (!title || !description || !keywords || !Array.isArray(keywords)) {
    return res.status(400).json({ success: false, msg: 'Title, description, and keywords (array) are required' });
  }

  const job = await Job.create({ title, description, keywords });
  res.status(201).json({ success: true, msg: 'Job created', job });
});

// Get all jobs
const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, jobs });
});

// Get a job by ID
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ success: false, msg: 'Job not found' });
  }
  res.status(200).json({ success: true, job });
});

// Update a job
const updateJob = asyncHandler(async (req, res) => {
  const { title, description, keywords } = req.body;

  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ success: false, msg: 'Job not found' });
  }

  const updatedData = {
    title: title || job.title,
    description: description || job.description,
    keywords: Array.isArray(keywords) ? keywords : job.keywords,
  };

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, updatedData, { new: true });

  res.status(200).json({ success: true, msg: 'Job updated', job: updatedJob });
});

// Delete a job
const deleteJob = asyncHandler(async (req, res) => {
  const deletedJob = await Job.findByIdAndDelete(req.params.id);
  if (!deletedJob) {
    return res.status(404).json({ success: false, msg: 'Job not found' });
  }

  res.status(200).json({ success: true, msg: 'Job deleted', job: deletedJob });
});

// Get total job count
const getJobCount = asyncHandler(async (req, res) => {
  const count = await Job.countDocuments();
  res.status(200).json({ count });
});

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobCount,
};
