const router = require("express").Router();
const { restart } = require("nodemon");
const City = require("../models/City.model");
const Destination = require("../models/Destination.model");
const User = require('../models/User.model');

//add way to edit destination

// router.post('/addDestination', (req, res, next) =>{
// const { name, description, city, address, destinationType, cityId } = req.body;

// Destination.create({ name, description, city, address, destinationType, city: cityId})
// .then(newDestionation => {
//     return City.findByIdAndUpdate(cityId, { $push : { destinations: newDestionation._id }});
// })
// .then(response => res.json(response))
// .catch(err => res.json(err));
// });

// module.exports = router;