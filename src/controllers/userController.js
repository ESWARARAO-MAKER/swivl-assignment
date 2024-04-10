const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config')

class UserController {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.create({ username, password });
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, config.jwtSecret);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async profile(req, res) {
    try {
      const user = await User.findById(req.userId);
      res.json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
