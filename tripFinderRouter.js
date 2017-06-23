const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {searchResults} = require('./models');

// Temporary Data for backend testing
searchResults.create('10/15/2017', 'Advanced');
searchResults.create('9/14/2017', 'Beginner');

// Get request is really the only CRUD op that is used for the customer(user)
router.get('/', (req, res) => {
	res.json(searchResults.get());
});

// Post, Delete, and Put are currently set to $SearchReslt var, but
// they will actually be set to something different because the admin
// or "western spirit employee" user will be the only user that interacts
// with this part of the CRUD operation.

router.post('/', jsonParser, (req, res) => {
  // ensure `date` and `ability` are in request body
  const requiredFields = ['date', 'ability'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = searchResults.create(req.body.date, req.body.ability);
  res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
  searchResults.delete(req.params.id);
  console.log(`Deleted search result item \`${req.params.ID}\``);
  res.status(204).end();
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
