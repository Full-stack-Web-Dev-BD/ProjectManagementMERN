// Model/Runs.js
const mongoose = require('mongoose');

const runsSchema = new mongoose.Schema({
  testrunName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  testDuraton: {
    type: String,
    required: true,
  },
  numberOfFunctionFailed: {
    type: String,
    required: true,
  },
  NumberOfFunctionTested: {
    type: String,
    required: true,
  },
  NumberOfFunctionWOTest: {
    type: String,
    required: true,
  },
  NumberOfFunctionPassed: {
    type: String,
    required: true,
  },
  BranchCoverage: {
    type: String,
    required: true,
  },
  StatementCoverage: {
    type: String,
    required: true,
  },
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Runs = mongoose.model('Runs', runsSchema);

module.exports = Runs;
