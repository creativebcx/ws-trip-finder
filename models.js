const uuid = require('uuid');
const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
	nameOfTrip: {type: String, require: true},
	url: {type: String, require: true},
	img: {type: String, require: true},
	description: {type: String, require: true},
	location: {type: String, require: true},
	tripDate: {
		startTrip: {type: String, require: true},
		endTrip: {type: String, require: true}
	},
	abilityLevel: {type: String, require: true},
	dateEdited: {type: Date, default: Date.now}
});

tripSchema.virtual('tripDate').get(function() {
	return `${this.tripDate.start} ${this.tripDate.end}`.trim();
});

tripSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		nameOfTrip: this.nameOfTrip,
		url: this.url,
		description: this.description,
		location: this.location,
		tripDate: this.tripDate,
		abilityLevel: this.abilityLevel
	};
}

const TripPackage = mongoose.model('TripPackage', tripSchema);

module.exports = {TripPackage};


