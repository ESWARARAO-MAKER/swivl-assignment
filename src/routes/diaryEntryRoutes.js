const express = require('express');
const router = express.Router();
const diaryEntryController = require('../controllers/diaryEntryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, diaryEntryController.create);
router.get('/', authMiddleware, diaryEntryController.getAll);
router.get('/:id', authMiddleware, diaryEntryController.getById);
router.put('/:id', authMiddleware, diaryEntryController.update);
router.delete('/:id', authMiddleware, diaryEntryController.delete);

module.exports = router;
