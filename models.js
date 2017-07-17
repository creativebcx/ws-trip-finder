const uuid = require('uuid');
const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
	nameOfTrip: {type: String, require: true},
	url: {type: String, require: true},
	img: {type: String, require: true},
	description: {type: String, require: true},
	location: {type: String, require: true},
	startTrip: {type: [String]},
	endTrip: {type: [String]},
	abilityLevel: {type: String, require: true},
});

tripSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		nameOfTrip: this.nameOfTrip,
		url: this.url,
		description: this.description,
		location: this.location,
		startTrip: this.startTrip,
		endTrip: this.endTrip,
		abilityLevel: this.abilityLevel
	};
}

const TripPackage = mongoose.model('TripPackage', tripSchema);

module.exports = {TripPackage};

