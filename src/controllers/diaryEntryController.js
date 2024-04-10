const DiaryEntry = require('../models/dairyEntry');

class DiaryEntryController {
  async create(req, res) {
    try {
      const { title, description, location, photos } = req.body;
      const diaryEntry = await DiaryEntry.create({
        title,
        description,
        location,
        photos,
        user: req.userId,
      });
      res.status(201).json({ diaryEntry });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const diaryEntries = await DiaryEntry.find({ user: req.userId });
      res.json({ diaryEntries });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const diaryEntry = await DiaryEntry.findOne({ _id: req.params.id, user: req.userId });
      if (!diaryEntry) {
        return res.status(404).json({ message: 'Diary entry not found' });
      }
      res.json({ diaryEntry });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { title, description, location, photos } = req.body;
      const diaryEntry = await DiaryEntry.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        { title, description, location, photos },
        { new: true }
      );
      if (!diaryEntry) {
        return res.status(404).json({ message: 'Diary entry not found' });
      }
      res.json({ diaryEntry });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const diaryEntry = await DiaryEntry.findOneAndDelete({ _id: req.params.id, user: req.userId });
      if (!diaryEntry) {
        return res.status(404).json({ message: 'Diary entry not found' });
      }
      res.json({ message: 'Diary entry deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new DiaryEntryController();
