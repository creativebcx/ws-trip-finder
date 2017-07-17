var elrefreshButton = $('#refreshList');
var elNewTripButton = $('#createNewTrip');
var newTripBoxStyle = $('#newTripBoxStyle');
var elSubmitNewTrip = $('#submitNewTrip');
var state = {
	currentStep: 0,
	currentSelectionDate: ["1/1/2018"],
	currentSelectionAbility: [{
		abilityLevel: "All-Abilities"
	}]
};

// trip object that will take all values

elNewTripButton.click( function(event) {
  newTripBoxStyle.removeClass('hidden');
  getDataFromApi();
})

elrefreshButton.click( function(event) {
	getDataFromApi();
});

elSubmitNewTrip.click( function(event) {
  var trip = {}
    trip.newNameOfTrip = $('#adminNewName').val();
    trip.newURL = $('#adminNewButton').val();
    trip.newLocation = $('#adminNewLocation').val();
    trip.newStart = $('#adminNewStart').val();
    trip.newEnd = $('#adminNewEnd').val();
    trip.newDescription = $('#adminNewDescription').val();
    trip.newAbility = $('#adminNewAbility').val();
  return trip;
});

//create seperate function for post request....

function getDataFromApi() {
	var wsTripFinderAPI = "https://secure-bastion-80953.herokuapp.com/trip-finder";
	$.getJSON( wsTripFinderAPI, {
		format: 'json',
		date: state.currentSelectionDate[0],
		abilityLevel: state.currentSelectionAbility[0]
		})
		.done( function( data ) {

			// returning the json object from the GET request to the user

			var Trips = data.trips;

			function createTripList (data) {	
				$('#trip-list-wrapper').append("<div></div>");
					for (var i in Trips) {
    				var div = "<div id='trip-list-inner-wrapper'>";
    				$("#trip-list-wrapper").append(div.concat("<div id='adminInfoBox'><div id='adminName'>" + 
              Trips[i].nameOfTrip + "</div>") + " " +
    					//"<a href='Trips[i]._id'>Select</a>" + " " +
    					"<div id='adminAbility'>Ability Level: " + Trips[i].abilityLevel + "</div>" + " " +
              "<div id='adminStartStyle'>Current Start Dates: " + Trips[i].tripDates.startTrip + "</div></div>" +
              "<div id='adminButtonBox'><button id='adminUpdateTrip'>Edit Trip</button></div>" +
              "<div id='adminImgBox'><img id='adminImgCheckImg' src='" + Trips[i].img + "'></img></div>"               
    				)
					}				
			};
			createTripList();
		});
};