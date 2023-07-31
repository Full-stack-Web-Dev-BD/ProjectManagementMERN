// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan  = require("morgan")
const cors = require('cors')
dotenv.config();
const path = require('path');

const app = express();
app.use(cors())
// Body Parser Middleware
app.use(express.json());
app.use(morgan("dev"))

// MongoDB Connection
mongoose.connect("mongodb+srv://dappmaster:kollol@cluster0.actqmgr.mongodb.net/projectAI?retryWrites=true&w=majority")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./Routes/UserRoutes'));
app.use('/api/projects', require('./Routes/ProjectRoutes')); 
app.use('/api/runs', require('./Routes/RunsRouter')); 

const uploadFolder = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadFolder));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
