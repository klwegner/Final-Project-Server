const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require('./../middleware/jwt.middleware.js')

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;
  
  if (email === "" || password === "" || username === "") {
      res.status(400).json({ message: "Provide email, password and username" });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
}

User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "Account already exists. Please log in" });
          return;
        }
        
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ username, email, password: hashedPassword });
    })
    .then((createdUser) => {
      const { username, email, _id } = createdUser;
      const user = { username, email, _id };
      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "internal server error" });
    });
});





router.post('/login', (req, res, next) => {
const { username, password } = req.body;

if(username ===''|| password ==='') {
    res.status(400).json({ message: 'Please enter your username and password.'});
    return;
}

User.findOne({ username })
    .then((foundUser) => {
        console.log(foundUser);
        if(!foundUser) {
            res.status(401).json({message: 'user not found'})
            return;
        }

        const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

        if(passwordCorrect) {
            const {_id, email, username } = foundUser;
            const payload = {_id, email, username };
            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                {algorithm: 'HS256', expiresIn: '24h'}
            );
            res.status(200).json({ authToken: authToken});
        
        }
        else {
            res.status(401).json({message: 'Unable to authenticate user'});
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    })





})
// .catch(err => res.status(500).json({message: 'internal server error'}));


router.get('/verify', isAuthenticated, (req, res, next) =>{
console.log('req.payload', req.payload);
res.status(200).json(req.payload);

});


module.exports = router;
