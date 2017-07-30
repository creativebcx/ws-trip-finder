const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const moment = require('moment');
moment().format();

const {TripPackage} = require('./models');

router.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res, next) {
  let date = moment(req.query.date.date, 'MM-DD-YYYY');
  //let tMinus = moment(date, "MM-DD-YYYY").subtract(14, 'd');
  //let tPlus = moment(date, "MM-DD-YYYY").add(14, 'd');
  //let tMax = [moment.max(tMinus, tPlus).format("MM/DD/YYYY")];
  //let tMin = moment.min(tMinus, tPlus).unix(Number);

    let dateRange = [moment(date, "MM-DD-YYYY").subtract(14, 'd').format("MM/DD/YYYY")];
      dateRange.push(moment(date, "MM-DD-YYYY").subtract(13, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").subtract(12, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").subtract(11, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").subtract(10, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").subtract(09, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").subtract(08, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").subtract(07, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").subtract(06, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").subtract(05, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").subtract(04, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").subtract(03, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").subtract(02, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(01, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(02, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(03, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(04, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(05, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(06, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(07, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(08, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(09, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(10, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(11, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(12, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(13, 'd').format("MM/DD/YYYY"));
      dateRange.push(moment(date, "MM-DD-YYYY").add(14, 'd').format("MM/DD/YYYY"));
  /* original date array function work - not functional
  let tMin = moment.min(tMinus, tPlus).format("MM/DD/YYYY");
  let arrayTest = ["8/7/2017", "8/8/2017"];
  function makeRange() {
    let dateRange = [];
    for (var i=tMin; i<=tMax; i) {
      dateRange.push(i);
    }
    return dateRange;
  };*/

  TripPackage
    .find({startTrip: {$in: dateRange}})
    //.find()
    .limit(20)
    .exec()
    .then(Trips => {
      //console.log(Trips);
      let abilityLevel = req.query.abilityLevel.abilityLevel;
      let response = Trips.filter( function (trip) {
      //console.log(abilityLevel);
      switch (abilityLevel) {
        case 'Introductory':
          return trip.abilityLevel == 'Introductory' || trip.abilityLevel == 'Introductory-Intermediate';
        break;

        case 'Introductory-Intermediate':
          return trip.abilityLevel == 'Introductory-Intermediate' || trip.abilityLevel == 'Introductory' 
           || trip.abilityLevel == 'Intermediate';
        break;

        case 'Intermediate':
          return trip.abilityLevel == 'Intermediate' || trip.abilityLevel == 'Introductory-Intermediate' || 
            trip.abilityLevel == 'Intermediate-Advanced';
        break;

        case 'Intermediate-Advanced':
          return trip.abilityLevel == 'Intermediate-Advanced' || trip.abilityLevel == 'Intermediate' ||
            trip.abilityLevel == 'Advanced';
        break;

        case 'Advanced':
          return trip.abilityLevel == 'Advanced' || trip.abilityLevel == 'Intermediate-Advanced';
        break;
        
        case 'All-Abilities':
          return trip.abilityLevel == 'Advanced' || trip.abilityLevel == 'Intermediate-Advanced' ||
            trip.abilityLevel == 'Intermediate' || trip.abilityLevel == 'Introductory-Intermediate' ||
            trip.abilityLevel == 'Introductory';
        break;     
        }
      })

      res.json({
          trips: response
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

router.post('/', jsonParser, (req, res) => {
  const requiredFields = [
    'nameOfTrip',
    'url',
    'img',
    'description',
    'location',
    'startTrip',
    'endTrip',
    'abilityLevel'
    ];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    console.log(req.body);
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  TripPackage
    .create({
      nameOfTrip: req.body.nameOfTrip,
      url: req.body.url,
      img: req.body.img,
      description: req.body.description,
      location: req.body.location,
      startTrip: req.body.startTrip,
      endTrip: req.body.endTrip,
      abilityLevel: req.body.abilityLevel
    })
    .then(tripFinder => res.status(201).json(tripFinder.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong while trying to POST an entry'});
    });
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['id'];
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
});

module.exports = router;


// req.query.<somekey>