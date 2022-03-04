const nodemailer = require('nodemailer')
const sendMail = function ({ from, to, subject, html }) {
  const mailOptions = {
    from,
    to,
    subject,
    html,
  }
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  })
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}

module.exports = sendMail
