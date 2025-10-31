const express = require('express');
const router = express.Router();
const {
  subscribeNewsletter,
  getAllSubscribers,
  deleteSubscriber,
  sendNewsletter,
} = require('../controllers/newsletterController');

// Public: subscribe
router.post('/', subscribeNewsletter);

// Admin: fetch all / delete
router.get('/', getAllSubscribers);
router.delete('/:id', deleteSubscriber);

// Admin: send newsletter
router.post('/send', sendNewsletter);

module.exports = router;
