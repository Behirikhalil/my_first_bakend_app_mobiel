const mongoose = require('mongoose'); 
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/yourDB', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         serverSelectionTimeoutMS: 5000
        });
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ Error connecting to MongoDB:', err);
        process.exit(0);
    }
}

module.exports = connectDB;