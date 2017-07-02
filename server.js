const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.static('public'));
app.use(morgan('common'));

const tripFinderRouter = require('./tripFinderRouter');
//const {router: tripFinderRouter} = require('./tripFinderRouter');

//mongoose & database
const {DATABASE_URL, PORT} = require('./config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use('/trip-finder', tripFinderRouter);

app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let server;

// run server function
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        console.log('An error has occured while trying to connect with the db.');
        return reject(err);
      }
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      console.log(databaseUrl);
    resolve();
  })
  .on('error', err => {
    mongoose.disconnect();
    reject(err);
    console.log(`Database Error`);
    });
  });
});
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();    
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};

