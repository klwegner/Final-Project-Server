const router = require("express").Router();
const City = require("../models/City.model");
const Destination = require("../models/Destination.model");
const User = require('../models/User.model');

router.post('/addDestination', (req, res, next) =>{
const { name, description, address, destinationType, cityId, done } = req.body;

Destination.create({ name, description, address, destinationType, cityId, done:false})
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

    router.put('/destinations/:destinationId', (req, res, next) => {
        Destination.findByIdAndUpdate(req.params.destinationId)
        .then((oneDestination) => res.status(200).json(oneDestination))
        .catch((err) => {
            console.log(err)
            res.json(err)})
        })



module.exports = router;