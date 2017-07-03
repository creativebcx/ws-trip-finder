const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {TripPackage} = require('./models');
//mongoose.Promise = global.Promise;

router.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res, next) {
    TripPackage
      .find()
      .limit(10)
      .exec()
      .then(Trips => {
        console.log("GET Request has been made!")
        res.json({
          trips: Trips
        });
      })
      .catch(err => {
      console.error(err);
      res.status(500).json({error: 'An error has occured within the GET request'});
    });
});

router.get('/:id', (req, res) => {
  TripPackage
    .findById(req.params.id)
    .exec()
    .then(post => res.json(post.apiRepr()))
    .catch(err => {
      console.error(error);
      res.status(500).json({
        error: 'An error has occured while trying to complete a GET request by ID.'})
    });
});

router.post('/', (req, res) => {
  const requiredFields = [
    'nameOfTrip',
    'url',
    'img',
    'description',
    'location',
    'tripDates.startTrip',
    'tripDates.endTrip',
    'abilityLevel'
    ];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  BlogPost
    .create({
      nameOfTrip: this.nameOfTrip,
      url: this.url,
      description: this.description,
      location: this.location,
      tripDate: this.tripDate,
      abilityLevel: this.abilityLevel
    })
    .then(tripFinder => res.status(201).json(tripFinder.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong while trying to POST an entry'});
    });

});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['date', 'ability', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating search result item \`${req.params.id}\``);
  const updatedItem = searchResults.update({
    id: req.params.id,
    date: req.body.date,
    ability: req.body.ability
  });
  res.status(204).json(updatedItem);
})

module.exports = router;
