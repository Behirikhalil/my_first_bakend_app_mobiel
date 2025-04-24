const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    userEmail :{
        type:String,
        required:true
    },
    userCode:{
        type:Number,
        required:true,
    }
});

module.exports = mongoose.model('User',userShema);