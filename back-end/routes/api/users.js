require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;
const db = require('../../models')

// Load User model
// const User = require('../../models/User');

// GET api/users/test (public)
router.get('/test', (req, res) => {
  res.json({ msg: 'User endpoint OK'});
});

router.post('/register', (req, res) => {
  db.User.findOne({email: req.body.email })
  .then(user => {
    // if user exists send a 400 response
    if (user) {
      return res.status(400).json({msg: 'Email already exists'})
    } else {
      // create a new user
      // grab newUser data from front-end axios post request
      // hence req.body
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // salt and hash the password then save the user
      // in bcrypt , first param is always the error
      // salt for 10 iterations
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          // Change the password to the hash
          if (error) throw error;
          newUser.password = hash;
          newUser.save()
          .then(createdUser => res.json(createdUser))
          .catch(err => console.log(err))
        })
      })
    }
  })
})


// POST to api/users/login PUBLIC
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find a user email
  db.User.findOne({email}) // basically saying {email: email}
  .then(user => { // HERE IS THE USER VAR WE ARE USING BELOW
    if (!user) {
      res.status(400).json({message: 'User Not Found!'})
    } else {
      // if we find a user, check password with bcrypt
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          // User match, send JSON webtoken so theyre authenticated
          // Create a token payload (you can include anything you want)
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email
          };
          // Sign token, grab the jwt we imported
          // which token, sign with secret, expires when?
          jwt.sign(payload, JWT_SECRET, {expiresIn: 3600}, (error, token) => {
            res.json({success: true, token: `Bearer ${token}`})
          })
        } else {
          return res.status(400).json({ password: 'Password or email is incorrect'})
        }
      });
    }
  });
});

// GET api/users/current PRIVATE
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})


module.exports = router;
