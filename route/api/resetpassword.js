const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const config = require('config');
const User = require('../../models/Users');

//Node mailer setup
const senderEmail = config.get('senderEmail');
const senderPassword = config.get('senderPassword');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//@route        POST api/resetpassword
//@desc         Reset Password
//@access       Public

router.post('/', (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email }).then((dbUser) => {
      if (!dbUser) {
        return res.status(422).json({ error: 'Email not found' });
      }
      dbUser.resetToken = token;
      dbUser.expireToken = Date.now() + 300000;
      dbUser.save().then((result) => {
        // send mail
        try {
          transporter.sendMail({
            from: `no-reply@binarydiary.com <${senderEmail}>`,
            to: `${dbUser.email}`,
            subject: 'Passwod Reset Request',
            text: 'test ',
            html: `
            <p>Hi ${dbUser.name}, We received your request for password reset</p>
            <h5>click this <a href="http://localhost:3000/resetpassword/${token}">link</a>  to reset your password, This link will be active for only 5 minutes</h5>
            <br>
            <br>
            <p style="font-weight: 800">Team Binary~Diary</p>
            `,
          });
          res.json({ msg: 'Reset Link sent' });
        } catch (mailErr) {
          console.error(mailErr.message);
        }
      });
    });
  });
});

//@route        POST api/newpassword
//@desc         Reset Password
//@access       Public

router.post('/newpassword', (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({
    resetToken: sentToken,
    expireToken: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        return res.json({
          errcode: 'err-001',
          msg: 'Password Reset Link Expired',
        });
      }
      bcrypt.hash(newPassword, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        user.resetToken = `hjanc98whenfuic7298w74eudjoin2njqk3hed8y29834e908203u0948e73yd7h23ieu23iy4e16y2ueihbndkjqhwe`;
        user.expireToken = undefined;
        user.save().then((saveduser) => {
          res.json({
            successcode: 'succ-001',
            msg: 'Password Updated Successfully',
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
