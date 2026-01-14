// src/models/Aid.js
const mongoose = require('mongoose');

const aidSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: {
      values: ['food', 'medical', 'shelter', 'other'],
      message: '{VALUE} is not a valid help type'
    }
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: [true, 'Location coordinates are required'],
      validate: {
        validator: function(val) {
          return val.length === 2;
        },
        message: 'Coordinates must be [longitude, latitude]'
      }
    }
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Provider (user) is required']
  },
  contact: {
    type: String,
    trim: true,
    maxlength: [20, 'Contact cannot be more than 20 characters']
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // automatically adds updatedAt field
});

// Enable geospatial queries (very important for nearby search)
aidSchema.index({ location: '2dsphere' });

// Optional: virtual field for easy access
aidSchema.virtual('coordinatesFormatted').get(function() {
  return {
    lat: this.location.coordinates[1],
    lng: this.location.coordinates[0]
  };
});

module.exports = mongoose.model('Aid', aidSchema);