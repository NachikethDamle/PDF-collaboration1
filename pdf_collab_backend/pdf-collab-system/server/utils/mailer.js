const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendInviteEmail = async (to, link) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'PDF File Shared With You',
    html: `<p>You’ve been invited to view a PDF file. Click the link below to access it:</p>
           <a href="${link}">${link}</a>`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendInviteEmail;
