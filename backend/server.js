const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const leaveRoutes = require('./routes/leaveRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/student', require('./routes/studentRoutes'));
app.use('/attendance', require('./routes/attendanceRoutes'));
app.use('/leave', require('./routes/leaveRoutes'));

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
