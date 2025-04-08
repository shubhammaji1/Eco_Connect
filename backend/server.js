const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/vendorVault', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Reel Schema
const ReelSchema = new mongoose.Schema({
  files: [String], 
  fileType: String,
  caption: String,
  music: String,
  likes: { type: [String], default: [] }, // Ensure it's always an array
  shares: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Reel = mongoose.model('Reel', ReelSchema);

// Multer Setup for File Uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Upload Reel API
app.post('/upload', upload.array('files', 10), async (req, res) => {
  try {
    console.log("Uploaded Files:", req.files); // Debugging log

    const filePaths = req.files.map(file => `/uploads/${file.filename}`);
    const { caption, music } = req.body;
    const fileType = req.files[0].mimetype.split('/')[0]; // Detect 'image' or 'video'

    const newReel = new Reel({ files: filePaths, caption, music, fileType });
    await newReel.save();

    res.status(201).json({ message: 'Reel uploaded successfully!', reel: newReel });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload reel' });
  }
});

// Fetch All Reels API
app.get('/reels', async (req, res) => {
  try {
    const reels = await Reel.find();
    res.status(200).json(reels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reels' });
  }
});

// ✅ Like & Unlike Reel API (with Fixes)
app.post('/reel/like/:id', async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) {
      return res.status(404).json({ message: 'Reel not found' });
    }

    const userId = req.body.userId; // User ID from frontend

    // Ensure likes is always an array
    if (!Array.isArray(reel.likes)) {
      reel.likes = [];
    }

    const index = reel.likes.indexOf(userId);
    if (index === -1) {
      reel.likes.push(userId); // Like the reel
    } else {
      reel.likes.splice(index, 1); // Unlike the reel
    }

    await reel.save();
    res.json({ likes: reel.likes.length, likedByUser: index === -1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Share Reel API
app.post('/reel/share/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const reel = await Reel.findByIdAndUpdate(id, { $inc: { shares: 1 } }, { new: true });
    res.status(200).json(reel);
  } catch (error) {
    res.status(500).json({ message: 'Error sharing the reel' });
  }
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// User Signup API
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// User Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
