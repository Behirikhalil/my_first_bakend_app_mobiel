const mongoose = require('mongoose');

async function connectDB() {
    // تحسينات سلسلة الاتصال
    const connectionURI = process.env.MONGODB_URI || 'mongodb://mongo:27017/yourDB';
    
    try {
        await mongoose.connect(connectionURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // زيادة مهلة الانتظار إلى 30 ثانية
            socketTimeoutMS: 45000, // مهلة جديدة لأيادي السوكيت
            maxPoolSize: 10, // تحديد حجم تجمع الاتصالات
            retryWrites: true,
            w: 'majority'
        });
        
        console.log('✅ Connected to MongoDB successfully');
        
        // إضافة مستمع لأحداث الاتصال
        mongoose.connection.on('connected', () => {
            console.log('Mongoose default connection open');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error('Mongoose default connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose default connection disconnected');
        });
        
    } catch (err) {
        console.error('❌ Critical Error connecting to MongoDB:', err);
        // إعادة المحاولة بعد 5 ثواني (اختياري)
        setTimeout(connectDB, 5000);
        // process.exit(1); // الخروج مع كود خطأ 1 (أكثر ملاءمة للنشر)
    }
}

module.exports = connectDB;