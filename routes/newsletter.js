const express = require('express');
const router = express.Router();
const { subscribeNewsletter, getAllSubscribers, deleteSubscriber } = require('../controllers/newsletterController');

// Subscribe
router.post('/', subscribeNewsletter);

// Get all subscribers
router.get('/', getAllSubscribers);

// Delete a subscriber
router.delete('/:id', deleteSubscriber);

module.exports = router;
