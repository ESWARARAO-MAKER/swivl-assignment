const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config')
const { registerValidation, loginValidation } = require('../utils/validation');

class AuthController {
  async register(req, res) {
    // Validate request body
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const { username, password } = req.body;
      // Check if username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      // Create new user
      const user = await User.create({ username, password });
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    // Validate request body
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // If the user is found and password is correct, create a token
      const token = jwt.sign({ userId: user._id }, config.jwtSecret);

      // Set the token as a cookie in the response
      res.cookie('token', token, { httpOnly: true });
  
      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
