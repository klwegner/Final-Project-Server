const router = require("express").Router();

const { restart } = require("nodemon");
const City = require("../models/City.model");
const Destination = require("../models/Destination.model");

//???????????????????
//should the router post to AddCity page or all cities?

router.post("/addCity", (req, res, next) => {
  const { name, description, location, destination } = req.body;

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
  

  return City.create({ name, description, location, destinations: [] })
})
.then((createdCity)=>{
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
.then((oneCity)=>res.status(200).json(city))
.catch((err) => {
    console.log(err)
    res.json(err)})
})

module.exports = router;
