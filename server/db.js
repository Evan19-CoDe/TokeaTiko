const {mongoose} = require('mongoose');
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});