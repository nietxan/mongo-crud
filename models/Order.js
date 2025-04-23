const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	order_id:    { type: Number, required: true, unique: true },
	customer_id: { type: Number, required: true },
	order_date:  { type: Date,   default: Date.now },
	amount:      { type: Number, required: true },
	status:      {
		type: String,
		enum: ['pending','shipped','delivered','canceled'],
		default: 'pending'
	}
});

// Indexes for better performance on searches
orderSchema.index({ customer_id: 1 });
orderSchema.index({ customer_id: 1, status: 1 });

module.exports = mongoose.model('Order', orderSchema);
