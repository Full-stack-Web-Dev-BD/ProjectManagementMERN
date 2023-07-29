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
    check('name').notEmpty().withMessage('Run name is required'),
    check('error').notEmpty().withMessage('Error is required'),
    check('coverage').notEmpty().withMessage('Error is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, error, coverage } = req.body;
      const id = req.params.id;

      const newRun = new Runs({
        name,
        error,
        coverage,
        projectID:id

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
module.exports = router;
