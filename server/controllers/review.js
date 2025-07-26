// @desc    Get reviews for an event
// @route   GET /api/reviews/event/:eventId
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ event: req.params.eventId })
      .populate('user', 'name');
      
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Add review
// @route   POST /api/reviews
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const { title, text, rating, event } = req.body;

    const review = new Review({
      title,
      text,
      rating,
      event,
      user: req.user.id
    });

    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};