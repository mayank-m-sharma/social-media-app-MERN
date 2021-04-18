const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/Users");
const nodemailer = require("nodemailer");
const multer = require("multer");

// Multer Storage strategy
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// Multer file accept strategy
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb("Unsupported file type", false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
//Node mailer setup
const senderEmail = config.get("senderEmail");
const senderPassword = config.get("senderPassword");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
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

//@route        POST api / users
//@desc         Register User
//@access       Public
router.post(
  "/",
  upload.single('avatar'),
  check("name", "Name is required").notEmpty(),
  check("email", "Please inculde a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  check("username", "username is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errros: errors.array() });
    }

    const { name, email, password, username} = req.body;
    const avatar = req.file.path;
    //user register logic  -
    try {
      let user = await User.findOne({ email });
      let usernameExists = await User.findOne({ username });
      //1. see if user exists already
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }

      if (usernameExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "username already exists" }] });
      }
      
      user = new User({
        name,
        email,
        avatar,
        password,
        username,
        avatar
      });

      //3. Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save registered user to db
      await user.save();

      //4. Return jwt
      const payload = {
        user: {
          id: user.id,
        },
      };
      // send email
      // try {
      //   let info = await transporter.sendMail({
      //     from: `Binary~Diary <${senderEmail}>`,
      //     to: email,
      //     subject: 'Welcome to Binary Diary', // Subject line
      //     text: 'test ',
      //     html: '<b>Welcome email body goes here..</b>',
      //   });
      // } catch (mailErr) {
      //   console.error(mailErr.message);
      // }
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route        PUT api /users/changeProfilePicture
//@desc         Change Profile Picture
//@access       Private

router.put(
  '/changeProfilePicture/:id',
  upload.single('avatar'),
  async (req, res) => {
    console.log(req.file);
    try {
      let mediaPath;
      if (req.file === undefined) {
        mediaPath = null;
      } else {
        mediaPath = req.file.path;
      }
      const newPost = {
        avatar: mediaPath,
      };

      let user = await User.findById(req.params.id);
      user.avatar = mediaPath
      user.save()
      console.log('profile image uploaded');
      return res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);




module.exports = router;
