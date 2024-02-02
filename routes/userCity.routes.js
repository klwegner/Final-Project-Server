const router = require("express").Router();
const User = require("../models/User.model");
const UserCity = require("../models/UserCity.model");

router.get("/user-cities/:userId/:cityId", (req, res, next) => {
  const { userId, cityId } = req.params;

  UserCity.findOne({ userId, cityId })
    .then(userCity => {
        res.json(userCity);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while finding UserCity' });
    });
});

router.put("/user-cities/:userId/:cityId", (req, res, next) => {
  const { visited } = req.body;
  const { userId, cityId } = req.params;

  UserCity.findOneAndUpdate({ userId, cityId }, { visited }, { new: true })
    .then(updatedUserCity => {
      if (updatedUserCity) {
        res.status(200).json(updatedUserCity);
      } else {
        res.status(404).json({ message: 'User City not found!' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred while updating UserCity', error: err });
    });
});

router.post("/user-cities", (req, res, next) => {
    const { userId, cityId, visited } = req.body;
  
    UserCity.create({ userId, cityId, visited})
      .then(newUserCity => {
        res.status(201).json(newUserCity);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while creating UserCity' });
      });
  });

module.exports = router;
