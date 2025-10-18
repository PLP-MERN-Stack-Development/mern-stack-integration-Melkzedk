require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

connectDB();
const app = express();

app.use(cors());
app.use(express.json({ limit:'10mb' })); // for JSON payloads
app.use(express.urlencoded({ extended:true }));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// basic health
app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
