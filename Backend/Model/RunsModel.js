// Model/Runs.js
const mongoose = require('mongoose');

const runsSchema = new mongoose.Schema({
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    required: true,
  },
  coverage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Runs = mongoose.model('Runs', runsSchema);

module.exports = Runs;
