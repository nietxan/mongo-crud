const express = require('express');
const Order   = require('../models/Order');
const router  = express.Router();

// Create
router.post('/', async (req, res) => {
	try {
		const order = new Order(req.body);
		const saved = await order.save();
		res.status(201).json(saved);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Read all
router.get('/', async (req, res) => {
	try {
		const orders = await Order.find().sort({ order_date: -1 });
		res.json(orders);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Search / Filter
router.post('/search', async (req, res) => {
	try {
		const filter = {};
		const { customer_id, status } = req.body;
		if (customer_id) filter.customer_id = customer_id;
		if (status)      filter.status      = status;
		const orders = await Order.find(filter).sort({ order_date: -1 });
		res.json(orders);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Update
router.put('/:id', async (req, res) => {
	try {
		const updated = await Order.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!updated) return res.status(404).json({ error: 'Order not found' });
		res.json(updated);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Delete
router.delete('/:id', async (req, res) => {
	try {
		const deleted = await Order.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).json({ error: 'Order not found' });
		res.json({ message: 'Deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
