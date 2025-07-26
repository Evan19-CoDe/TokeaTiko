const mongoose = require('mongoose');
const ReviewSchema = require('./Review').schema; // OR just require('./Review') if you're exporting a model



const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true
    },
    quantity: {
        type: Number,
        required: [true, 'Please add a quantity'],
        min: 1
    },
    totalPrice: {
        type: Number,
        required: [true, 'Please add a total price']
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Static method to get total orders for a user
OrderSchema.statics.getTotalOrders = async function(userId) {
    const totalOrders = await this.countDocuments({ user: userId });
    return totalOrders;
}
module.exports = mongoose.model('Order', OrderSchema);
ReviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.event);
});