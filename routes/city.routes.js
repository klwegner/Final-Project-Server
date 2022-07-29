const router = require('express').Router();

const City = require('../models/City.model');
const Destination = require('../models/Destination.model');

//???????????????????
//should the router post to AddCity page or all cities?

router.post('/addCity', (req, res, next) =>{
const { name, description, location, destination } = req.body;

City.create({name, description, location, destinations: [] })
.then(res => res.json(res))
.catch(err => res.json(err))

})

router.get('/cities', (req, res, next) =>{
City.find()
.populate('Destination')
.then(city => res.status(200).json(city))
.catch(err => res.json(err))
});


//left off here after add city and list all cities