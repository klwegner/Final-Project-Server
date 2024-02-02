const router = require("express").Router();
const City = require("../models/City.model");
const Destination = require("../models/Destination.model");
const User = require("../models/User.model");

router.post("/addCity", (req, res, next) => {
  const { name, description, usState, country, destinations, visited } =
    req.body;

  if (name === "" || description === "" || country === "") {
    res.status(400).json({ message: "Please fill in required fields." });
    return;
  }

  City.findOne({ name }).then((foundCity) => {
    if (foundCity) {
      res.status(400).json({ message: "City already exists." });
      return;
    }
  });

  return City.create({
    name,
    description,
    usState,
    country,
    destinations: [],
    visited: false,
    userId: req.session.currentUser._id,
  })
    .then((createdCity) => {
      if (createdCity) {
        const {
          name,
          description,
          usState,
          country,
          destinations,
          _id,
          userId,
        } = createdCity;
        const city = {
          name,
          description,
          usState,
          country,
          destinations,
          _id,
          userId,
        };
        res.status(201).json({ city: city });

        //new below
        // User.findByIdAndUpdate(
        //   req.session.currentUser._id,
        //   { $push: { unvisitedCities: createdCity._id } },
        //   { new: true }
        //     .then((response) => console.log(response))
        //     .catch((err) =>
        //       console.log(
        //         "error while adding to current user unvisited cities array",
        //         err
        //       )
        //     )
        // );
      } else {
        res.status(500).json({ message: "internal server error" });
      }
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

router.get("/cities/:cityId", (req, res, next) => {
  City.findById(req.params.cityId)
    .then((oneCity) => res.status(200).json(oneCity))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.put("/cities/:cityId", (req, res, next) => {
  City.findByIdAndUpdate(req.params.cityId, req.body, { new: true })
    .then((oneCity) => res.status(200).json(oneCity))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete("/cities/:cityId", (req, res, next) => {
  const theCityId = req.params.cityId;
  City.findByIdAndRemove(theCityId)
    .then(() =>
      res.json({ message: `City with ${cityId} is removed successfully.` })
    )
    .catch((err) => res.json(err));
});

module.exports = router;
