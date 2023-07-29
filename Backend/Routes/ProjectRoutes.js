// Routes/projects.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Project = require('../Model/ProjectModel');

router.post(
    '/',
    [
      check('title').notEmpty().withMessage('Project title is required'),
      check('data').notEmpty().withMessage('Project data is required'),
      check('folderIn').notEmpty().withMessage('Folder In is required'),
      check('folderOut').notEmpty().withMessage('Folder Out is required'),
      check('timer').isInt({ min: 0 }).withMessage('Timer must be a non-negative integer'),
      check('user').notEmpty().withMessage('User ID is required'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const { title, data, folderIn, folderOut, timer, user } = req.body;
  
        const project = new Project({
          title,
          data,
          folderIn,
          folderOut,
          timer,
          user, // User ID is provided in the request body
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
  
      if (projects.length === 0) {
        return res.status(404).json({ message: 'No projects found for this user' });
      }
  
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
    const { title, data, folderIn, folderOut, timer } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.title = title;
    project.data = data;
    project.folderIn = folderIn;
    project.folderOut = folderOut;
    project.timer = timer;

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
