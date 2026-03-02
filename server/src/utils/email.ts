const nodemailer = require("nodemailer");
// Looking to send emails in production? Check out our Email API/SMTP product!

const sendEmail = (option) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const emailOptions = {
    from: "Dating App Support <support@datingapp.com",
    to: option.email,
    subject: option.subject,
    message: option.message,
  };
  transport.sendMail(emailOptions);
};

module.exports = sendEmail;
