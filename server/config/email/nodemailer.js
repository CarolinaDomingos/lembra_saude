const nodemailer = require("nodemailer"); // module to send emails
require("dotenv").config(); // get the variables from .env

exports.sendEmail = (email, subject, message) => {
  //get the service (ex: google) and the email address and password
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAILSEND_USER,
      pass: process.env.MAILSEND_PASSWORD,
    },
  });

  //Options to fill the email
  const mailOptions = {
    from: process.env.MAILSEND_EMAIL,
    to: email,
    subject: subject,
    text: message,
  };

  //Try to send the email, gives error if anything goes wrong, or ok if the email is sent.
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.loog("Email Sent: " + info.response);
    }
  });
};
