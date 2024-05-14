const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User'); // User model

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/smart_parking_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Register route
app.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords don't match" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: "Username already exists" });
    }

    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).send({ message: "Registration successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Other routes and middleware...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
