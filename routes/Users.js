const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//signup
router.post('/signup', async(req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (error) {
    console.log(error)
  }
})

//login
router.post('/login', async (req, res) => {
  try {
    //find user
    const user = await User.findOne({
      email: req.body.email
    });
    if(!user){
      res.status(400).json("Wrong username or password.")
    }

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if(!validPassword){
      res.status(400).json("Wrong username or password.")
    };

    //send response
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;