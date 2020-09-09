const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB Atlas instance.');
  } catch (err) {
    console.log('Error connecting to MongoDB Atlas:', err);
    process.exit(1); // Shut down application
  }
};

module.exports = connectDB;
