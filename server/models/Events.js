const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String,
    city: String,
    country: String
  },
  price: {
    type: Number,
    required: true
  },
  availableTickets: {
    type: Number,
    required: true
  },
  images: [{
    url: String,
    public_id: String
  }],
  videos: [{
    url: String,
    public_id: String
  }],
  category: {
    type: String,
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index for location
EventSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Event', EventSchema);