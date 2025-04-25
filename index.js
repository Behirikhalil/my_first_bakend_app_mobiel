const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require('./database');
const User = require('./users');
const message = require('./sendemail');
const app = express();

connectDB();
// إعداد Middleware
app.use(cors());
app.use(bodyParser.json());


app.post('/insert',async (req,res,next)=>{
  const email = req.body.email;
  const code =  Math.floor(100000 + Math.random() * 900000);
  console.log(email);
  try{
    const user = new User({
       userEmail:email,
       userCode:code,
    });
     await user.save();
     console.log("User saved successfully!");
     await message(email,code);
     res.json({ success: true, message: "📧 تم إرسال كود التحقق بنجاح!" });
  }catch(error){
    console.error(error);
    res.status(500).json({ success: false, message: "❌ فشل في إرسال البريد." });
  }
});

app.post('/verify-code',async(req,res,next)=>{
  try{
     const emailuser = req.body.email;
     const codeuser=req.body.code;
     const user = await User.findOne({userEmail:emailuser,userCode:codeuser});
     if(user){
       await User.deleteOne({ _id: user._id });
       console.log('code true');
       res.json({ success: true, message: "✅ كود التحقق صحيح!" });
     }
     else{
        console.log('code faux');
        res.status(400).json({ success: false, message: "❌ كود التحقق غير صحيح." });
     }
     
  }catch(error){
      console.error(error);
      res.status(400).json({ success: false, message: error });
  }
});


// تشغيل الخادم
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
