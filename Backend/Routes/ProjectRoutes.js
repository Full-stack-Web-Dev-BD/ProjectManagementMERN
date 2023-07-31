// Routes/projects.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Project = require('../Model/ProjectModel');

router.post(
  '/',
  [
    check('projectName').notEmpty().withMessage('projectName is  required'),
    check('state').notEmpty().withMessage('state is  required'),
    check('testsuite').notEmpty().withMessage('testsuite is  required'),
    check('rulSet').notEmpty().withMessage('rulSet is  required'),
    check('swRequirements').notEmpty().withMessage('swRequirements is  required'),
    check('codePath').notEmpty().withMessage('codePath is  required'),
    check('testCases').notEmpty().withMessage('testCases is  required'),
    check('user').notEmpty().withMessage('user is  required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { projectName, state, testsuite, rulSet, swRequirements, codePath, testCases, user } = req.body;

      const project = new Project({
        projectName,
        state,
        testsuite,
        rulSet,
        swRequirements,
        codePath,
        testCases,
        user,
      });

      await project.save();

      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get projects filtered by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const projects = await Project.find({ user: userId });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a project by ID
router.put('/:id', async (req, res) => {
  try {
    const { projectName, state, testsuite, rulSet, swRequirements, codePath, testCases, user } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.projectName = projectName;
    project.state = state;
    project.testsuite = testsuite;
    project.rulSet = rulSet;
    project.swRequirements = swRequirements;
    project.codePath = codePath;
    project.testCases = testCases;
    project.user = user;

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a project by ID
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.remove();

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
