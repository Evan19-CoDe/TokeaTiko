const Event = require('../models/Event');
const cloudinary = require('../config/cloudinary');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name');
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name');
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Create event
// @route   POST /api/events
// @access  Private/Admin
exports.createEvent = async (req, res) => {
  const { title, description, date, location, price, availableTickets, category } = req.body;

  try {
    // Upload images to Cloudinary
    const imageUploads = req.files.images?.map(async file => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'event-tickets'
      });
      return {
        url: result.secure_url,
        public_id: result.public_id
      };
    }) || [];

    // Upload videos to Cloudinary
    const videoUploads = req.files.videos?.map(async file => {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: 'video',
        folder: 'event-tickets'
      });
      return {
        url: result.secure_url,
        public_id: result.public_id
      };
    }) || [];

    const [images, videos] = await Promise.all([
      Promise.all(imageUploads),
      Promise.all(videoUploads)
    ]);

    const newEvent = new Event({
      title,
      description,
      date,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
        address: location.address,
        city: location.city,
        country: location.country
      },
      price,
      availableTickets,
      category,
      organizer: req.user.id,
      images,
      videos
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};