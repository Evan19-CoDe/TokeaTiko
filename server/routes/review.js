const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const reviewController = require('../controllers/reviews');
const auth = require('../middleware/auth');

// @route   GET /api/reviews/event/:eventId
// @desc    Get reviews for an event
// @access  Public
router.get('/event/:eventId', reviewController.getReviews);

// @route   POST /api/reviews
// @desc    Add review
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Please add a title').not().isEmpty(),
      check('text', 'Please add some text').not().isEmpty(),
      check('rating', 'Please add a rating between 1 and 5').isInt({ min: 1, max: 5 }),
      check('event', 'Event ID is required').not().isEmpty()
    ]
  ],
  reviewController.addReview
);

// @route   PUT /api/reviews/:id
// @desc    Update review
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check('title', 'Please add a title').not().isEmpty(),
      check('text', 'Please add some text').not().isEmpty(),
      check('rating', 'Please add a rating between 1 and 5').isInt({ min: 1, max: 5 })
    ]
  ],
  reviewController.updateReview
);

// @route   DELETE /api/reviews/:id
// @desc    Delete review
// @access  Private
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;