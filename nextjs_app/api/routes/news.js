const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const newsController = require('../controllers/newsController');

// Public news routes
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);

// Admin routes - protected with auth middleware
router.post('/', auth, newsController.createNews);
router.put('/:id', auth, newsController.updateNews);
router.delete('/:id', auth, newsController.deleteNews);

module.exports = router;
