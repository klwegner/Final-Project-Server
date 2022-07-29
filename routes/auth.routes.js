const { restart } = require('nodemon');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const router = require('express').Router();

router.post('/signup', (req, res, next) =>{

    const { name, username, email, password } = req.body;
    
    if(email === ''|| password === '' || name === '') {
        res.status(400).json({ message: 'Provide email, password and name' });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Provide a valid email address.' });
      return;
    }

    User.findOne({ email })
    .then((foundUser) => {

        if (foundUser) {
            res.status(400).json({message: 'User already exists'});
            return;
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);


        return User.create({ name, username, email, password: hashedPassword });
    })
    .then((createdUser) => {
const { name, username, email, _id } = createdUser;
const user = { name, username, email, _id };
res.status(201).json({ user: user });
    })
    .catch(err => {
console.log(err);
res.status(500).json({message:'internal server error'})
    });

});

module.exports = router;