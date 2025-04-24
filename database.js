const mongoose = require('mongoose'); 
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/testdata');
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ Error connecting to MongoDB:', err);
        process.exit(0);
    }
}

module.exports = connectDB;