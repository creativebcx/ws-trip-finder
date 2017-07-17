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

elNewTripButton.click( function(event) {
  newTripBoxStyle.removeClass('hidden');
  getDataFromApi();
})

elrefreshButton.click( function(event) {
	getDataFromApi();
});

elSubmitNewTrip.click( function(event) {
  var newNameOfTrip = $('#adminNewName').val();
  var newURL = $('#adminNewButton').val();
  var newLocation = $('#adminNewLocation').val();
  var newStart = $('#adminNewStart').val();
  var newEnd = $('#adminNewEnd').val();
  var newDescription = $('#adminNewDescription').val();
  var newAbility = $('#adminNewAbility').val();
});

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
              "<div id='adminStartStyle'>Current Start Dates: " + Trips[i].startTrip + "</div></div>" +
              "<div id='adminButtonBox'><button id='adminUpdateTrip'>Edit Trip</button></div>" +
              "<div id='adminImgBox'><img id='adminImgCheckImg' src='" + Trips[i].img + "'></img></div>"               
    				)
					}				
			};
			createTripList();
		});
};