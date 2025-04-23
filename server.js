require('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
const path      = require('path');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(express.json());
app.use('/api/orders', ordersRouter);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
