const express = require('express');
const router = express.Router();
const { getAllSubscribers, deleteSubscriber, subscribeNewsletter } = require('../controllers/newsletterController');

// POST → Subscribe
router.post('/', subscribeNewsletter);

// GET → Fetch all
router.get('/', getAllSubscribers);

// DELETE → Remove a subscriber
router.delete('/:id', deleteSubscriber);

module.exports = router;

