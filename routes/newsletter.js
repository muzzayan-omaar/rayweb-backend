const express = require('express');
const router = express.Router();
const {
  subscribeNewsletter,
  getAllSubscribers,
  deleteSubscriber
} = require('../controllers/newsletterController');

// Public: subscribe
router.post('/', subscribeNewsletter);

// Admin: fetch all / delete
router.get('/', getAllSubscribers);
router.delete('/:id', deleteSubscriber);

module.exports = router;
