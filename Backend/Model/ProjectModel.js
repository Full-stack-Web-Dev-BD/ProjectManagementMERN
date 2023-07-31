// Model/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  testsuite: {
    type: String,
    required: true,
  },
  rulSet: {
    type: String,
    required: true,
  },
  swRequirements: {
    type: String,
    required: true,
  },
  codePath: {
    type: String,
    required: true,
  },
  testCases: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
