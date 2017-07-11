var elrefreshButton = $('#refreshList');
var state = {
	currentStep: 0,
	currentSelectionDate: ["1/1/2018"],
	currentSelectionAbility: [{"Introductory"}]
};

elrefreshButton.click( function (event) {
	getDataFromApi();
});

function getDataFromApi() {
	var wsTripFinderAPI = "https://secure-bastion-80953.herokuapp.com/trip-finder";
	$.getJSON( wsTripFinderAPI, {
		format: 'json',
		date: state.currentSelectionDate[0],
		abilityLevel: state.currentSelectionAbility[0]
		})
	console.log(state.currentSelectionAbility[0])
		.done( function( data ) {
	console.log(data.trips)
			// creating variables to format the dates from the start date and end date arrays
				var newTripListS = data.trips[0].tripDates.startTrip;
				var newTripListE = data.trips[0].tripDates.endTrip;

			// creating a new date list based off of items in the array
			function createDateList (data) {	
				$('#tripDatesStyle').append("<ul>Trip dates: </ul>");
						for(var i in newTripListS) {
    					var li = "<li>";
    					$("ul").append(li.concat(newTripListS[i] + " - " + newTripListE[i]))
					}				
			};
			
			// returning the json object from the GET request to the user
			$('#trip-list-wrapper').html(
				'<div id="nameOfTripStyle">' + data.trips[0].nameOfTrip + '</div>' +
				'<div id="imgStyleDiv"><img id="imgStyle" src="'+ data.trips[0].img +'" alt="BB"></div>' +
				'<div id="descriptionStyle">' + data.trips[0].description + '</div>' +
				'<div id="locationStyle">Location: ' + data.trips[0].location + '</div>' +
				'<div id="tripDatesStyle"></div>' +
				'<div id="abilityLevelStyle">Ability level: ' + data.trips[0].abilityLevel + '</div>' +
				'<div id="urlStyle"><a href="' + data.trips[0].url + 
				'" target="_blank"><button>Find Out More!</button></a></div>'
			);
			createDateList();
		});
};