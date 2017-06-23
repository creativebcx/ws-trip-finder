const express = require('express');
const morgan = require('morgan');

const app = express();

const tripFinderRouter = require('./tripFinderRouter');
//const {router: tripFinderRouter} = require('./tripFinderRouter');

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.use('/trip-finder', tripFinderRouter);

app.listen(process.env.PORT || 8080, () => {
	console.log('your app is listening on port ${process.env.PORT || 8080}');
});

