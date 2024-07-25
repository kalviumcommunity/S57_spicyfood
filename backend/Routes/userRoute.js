const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Schema/userSchema');
const { usersValidationSchema } = require('./validation');

// Create a new user (Sign-up)
userRouter.post('/signup', async (req, res) => {
  console.log(req.body);
  try {
    const { error } = usersValidationSchema.validate(req.body);
    if (error) {
        console.log(error.message)
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'Account already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});

// Sign in user
userRouter.post('/signin', async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("USER nOT FOUND")
            return res.status(400).json({ message: 'User not found' });
        }
        
        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        res.json({ message: 'Sign-in successful' });
    } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRouter;
