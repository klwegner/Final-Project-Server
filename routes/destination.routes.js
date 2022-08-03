const router = require("express").Router();
const City = require("../models/City.model");
const Destination = require("../models/Destination.model");
const User = require('../models/User.model');

//add way to edit destination

router.post('/addDestination', (req, res, next) =>{
const { name, description, address, destinationType, cityId } = req.body;

Destination.create({ name, description, address, destinationType, cityId})
.then(newDestination => {
    return City.findByIdAndUpdate(cityId, { $push : { Destination: newDestination._id }});
})
.then(response => res.json(response))
.catch(err => res.json(err));
});

router.get("/cities/:cityId/destinations", (req, res, next) => {
    City.findById(req.params.cityId)
        .populate("Destination")
      .then((city) => {
      console.log(city)
      res.status(200).json(city)
    })
      .catch((err) => res.json(err));
  });
  
  router.get('/destinations/:destinationId', (req, res, next) =>{
    Destination.findById(req.params.destinationId)
    .then((oneDestination)=>res.status(200).json(oneDestination))
    .catch((err) => {
        console.log(err)
        res.json(err)})
    })




module.exports = router;