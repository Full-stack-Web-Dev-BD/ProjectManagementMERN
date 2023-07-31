// Routes/runs.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Runs = require('../Model/RunsModel');
const Project = require('../Model/ProjectModel');

// Add a new run to a project
router.post(
  '/:id',
  [
    check('testrunName').notEmpty().withMessage('testrunName is required'),
    check('state').notEmpty().withMessage('state is required'),
    check('testDuraton').notEmpty().withMessage('testDuraton is required'),
    check('numberOfFunctionFailed').notEmpty().withMessage('numberOfFunctionFailed is required'),
    check('NumberOfFunctionTested').notEmpty().withMessage('NumberOfFunctionTested is required'),
    check('NumberOfFunctionWOTest').notEmpty().withMessage('NumberOfFunctionWOTest is required'),
    check('NumberOfFunctionPassed').notEmpty().withMessage('NumberOfFunctionPassed is required'),
    check('BranchCoverage').notEmpty().withMessage('BranchCoverage is required'),
    check('StatementCoverage').notEmpty().withMessage('StatementCoverage is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        testrunName,
        state,
        testDuraton,
        numberOfFunctionFailed,
        NumberOfFunctionTested,
        NumberOfFunctionWOTest,
        NumberOfFunctionPassed,
        BranchCoverage,
        StatementCoverage,
      } = req.body;
      const id = req.params.id;

      const newRun = new Runs({
        testrunName,
        state,
        testDuraton,
        numberOfFunctionFailed,
        NumberOfFunctionTested,
        NumberOfFunctionWOTest,
        NumberOfFunctionPassed,
        BranchCoverage,
        StatementCoverage,
        projectID: id,
      });

      await newRun.save();

      // Add the new run to the project's runs array
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      await project.save();

      res.json(newRun);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
router.get('/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Find all runs with the given projectID
    const runs = await Runs.find({ projectID: projectId });

    res.json(runs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Edit a run
router.put('/:projectId/:runId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const runId = req.params.runId;

    // Find the run by projectID and runID
    const run = await Runs.findOne({ projectID: projectId, _id: runId });

    if (!run) {
      return res.status(404).json({ message: 'Run not found' });
    }

    // Update the run properties with the data from the request body
    const {
      testrunName,
      state,
      testDuraton,
      numberOfFunctionFailed,
      NumberOfFunctionTested,
      NumberOfFunctionWOTest,
      NumberOfFunctionPassed,
      BranchCoverage,
      StatementCoverage,
    } = req.body;

    run.testrunName = testrunName;
    run.state = state;
    run.testDuraton = testDuraton;
    run.numberOfFunctionFailed = numberOfFunctionFailed;
    run.NumberOfFunctionTested = NumberOfFunctionTested;
    run.NumberOfFunctionWOTest = NumberOfFunctionWOTest;
    run.NumberOfFunctionPassed = NumberOfFunctionPassed;
    run.BranchCoverage = BranchCoverage;
    run.StatementCoverage = StatementCoverage;

    await run.save();

    res.json(run);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Delete a run
router.delete('/:projectId/:runId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const runId = req.params.runId;

    // Find and delete the run by projectID and runID
    const run = await Runs.findOneAndDelete({ projectID: projectId, _id: runId });

    if (!run) {
      return res.status(404).json({ message: 'Run not found' });
    }

    res.json({ message: 'Run deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
