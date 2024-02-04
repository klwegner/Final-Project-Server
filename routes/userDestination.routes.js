const router = require("express").Router();
const User = require("../models/User.model");
const Destination = require("../models/Destination.model");
const UserDestination = require("../models/UserDestination.model");

//get one userDestination

router.get("/user-destinations/:userId/:destinationId", (req, res, next) => {
  const { destinationId, userId } = req.params;

  UserDestination.findOne({ destinationId, userId })
    .then(userDestination => {
        res.json(userDestination);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while finding userDestination status' });
    });
});

//get all userDestionations

router.get("/user-destinations/:userId", (req, res, next) => {
    const { userId, cityId } = req.params;
  
    UserDestination.find({ userId, cityId })
      .then(userDestinations => {
          res.json(userDestinations);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while finding user destinations' });
      });
  });
  

//update completed property

router.put("/user-destinations/:userId/:cityId/:destinationId", (req, res, next) => {
  const { completed } = req.body;
  const { userId, cityId, destinationId } = req.params;

  UserDestination.findOneAndUpdate({ userId, cityId, destinationId }, { completed }, { new: true })
    .then(updatedUserDestination => {
      if (updatedUserDestination) {
        res.status(200).json(updatedUserDestination);
      } else {
        res.status(404).json({ message: 'User City not found!' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred while updating UserDestination status', error: err });
    });
});

//create new

router.post("/user-destinations", (req, res, next) => {
    const { userId, destinationId, completed } = req.body;
  
    UserDestination.create({ userId, destinationId, completed})
      .then(newDestinationStatus => {
        res.status(201).json(newDestinationStatus);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while setting the userDestination status' });
      });
  });

module.exports = router;
