// Routes/auth.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');

const User = require('../Model/UserModel');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Specify the folder where images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// User signup route with image upload
router.post(
  '/signup',
  upload.single('image'), // Use 'image' as the field name in the request for the image
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const image = req.file ? req.file.filename : 'default_profile.jpg';

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        image,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);
// User login route
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').exists().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', async (req, res) => {
  try {
    // Assuming you have a way to determine if a user is an admin (e.g., role-based access)
    // For simplicity, we'll use a custom header named 'x-admin' to indicate the admin status.
    // if (!req.header('x-admin')) {
    //   return res.status(403).json({ message: 'Access denied' });
    // }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get single user (protected route, only accessible by the user or admin)
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming you have a way to determine if a user is the owner of the profile or an admin
    // For simplicity, we'll use a custom header named 'x-user' to indicate the user's ID.
    if (req.header('x-user') !== user.id && !req.header('x-admin')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Edit user (protected route, only accessible by the user or admin)
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming you have a way to determine if a user is the owner of the profile or an admin
    // For simplicity, we'll use a custom header named 'x-user' to indicate the user's ID.
    if (req.header('x-user') !== user.id && !req.header('x-admin')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update user details
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete user (protected route, only accessible by the user or admin)
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming you have a way to determine if a user is the owner of the profile or an admin
    // For simplicity, we'll use a custom header named 'x-user' to indicate the user's ID.
    if (req.header('x-user') !== user.id && !req.header('x-admin')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await user.remove();

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
