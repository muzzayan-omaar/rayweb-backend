const express = require('express');
const router = express.Router();
const { subscribeNewsletter } = require('../controllers/newsletterController');

const { getAllSubscribers, deleteSubscriber, subscribeNewsletter } = require('../controllers/newsletterController');

router.post('/', subscribeNewsletter);
router.get('/', getAllSubscribers);
router.delete('/:id', deleteSubscriber);

module.exports = router;

