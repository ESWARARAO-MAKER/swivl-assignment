const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const diaryEntryRoutes = require('./routes/diaryEntryRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const config = require('./config')
const dotenv = require('dotenv')

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// Routes
app.use('/users', userRoutes);
app.use('/diary-entries', authMiddleware, diaryEntryRoutes);

// Connect to MongoDB
mongoose.connect(config.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));
