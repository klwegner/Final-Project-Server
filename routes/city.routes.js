const router = require("express").Router();
const { restart } = require("nodemon");
const City = require("../models/City.model");
const Destination = require("../models/Destination.model");
const User = require('../models/User.model');


//do I need to add authentication in backend?

router.post("/addCity", (req, res, next) => {

  //add object to location: city, state (optional), country

  const { name, description, location, destinations, visited } = req.body;

  if (name === "" || description === "" || location === "") {
    res.status(400).json({ message: "Please fill in required fields." });
    return;
  }

  City.findOne({ location })
    .then((foundCity) => {
      if (foundCity) {
        res.status(400).json({ message: "City already exists." });
        return;
      }
  

  //add object to location: city, state (optional), country

  return City.create({ name, description, location, destinations: [], visited: false })
})
.then((createdCity)=>{

  //add object to location: city, state (optional), country

const { name, description, location, destinations, _id } = createdCity;
const city = { name, description, location, destinations, _id };
res.status(201).json({city: city});
})
.catch((err) => {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  });
});


router.get("/cities", (req, res, next) => {
  City.find()
    .populate("Destination")
    .then((city) => res.status(200).json(city))
    .catch((err) => res.json(err));
});

router.get('/cities/:cityId', (req, res, next) =>{
City.findById(req.params.cityId)
.then((oneCity)=>res.status(200).json(oneCity))
.catch((err) => {
    console.log(err)
    res.json(err)})
})

router.put('/cities/:cityId', (req, res, next) =>{
  City.findByIdAndUpdate(req.params.cityId, req.body, {new: true})
  .then((oneCity)=>res.status(200).json(oneCity))
  .catch((err) => {
      console.log(err)
      res.json(err)})
  })
  


router.delete('/cities/:cityId', (req, res, next) =>{
  const theCityId = req.params;
  //added below section to try to match with line 88, unclear if it works

  // City.findById(theCityId)
  // .then((foundCity)=>res.status(200).json(foundCity))
  // .catch((err) => {
  //     console.log(err)
  //     res.json(err)})
  //  if (`${req.session.currentUser._id}` == `${foundCity.userId}`) {
City.findByIdAndRemove(theCityId)
.then(() => res.json({ message: `City with ${cityId} is removed successfully.` }))
.catch(err => res.json(err))
  // }
  // else {
  //   res.json({ message: 'This is not a city you added!'})
  // }
})



//add something to edit city

module.exports = router;
