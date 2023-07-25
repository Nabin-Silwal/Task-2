const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// User registration
const registerUser = async (req, res) => {
    const { name, email, password, contact, gender, age } = req.body;
  
    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      user = new User({
        name,
        email,
        password: hashedPassword,
        contact,
        gender,
        age,
      });
  
      await user.save();
  
      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
        if (error) throw error;
  
        // Send back the registered user details in the response
        res.json({
            message: 'User registered successfully',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            gender: user.gender,
            age: user.age,
          },
          token
        });
      });
    } catch (error) {
      console.error('Error registering user:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update user details
const updateUser = async (req, res) => {
  const { name, email, contact, gender, age } = req.body;

  try {
    let user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, contact, gender, age },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    console.error('Error updating user details:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, updateUser };
