const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // استخدم App Password بدلاً من كلمة المرور العادية
  },
});
async function Message(email,code) {
  try {
    const info = await transporter.sendMail({
      from: '"Khalil Behiri" <khalilbehiri@gmail.com>', // المرسل
      to: email, // المستلم
      subject: "Rental", // عنوان البريد
      text: "Hello world :\n you code is \n "+code, // نص البريد
    });

    console.log("✅ Message sent: %s", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}
module.exports=Message;