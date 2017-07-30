//var autocomplete = require( "jquery-ui/ui/widgets/autocomplete" );
var elInnerBox = $('#inner-box-wrapper');
var elbackgroundImg = $('background-image');
var elStartButton = $('#landing-box, #start-button');
var elDatePicker = $('#datepicker');
var elLandingBox = $('#landing-box');
var elControlBox = $('#controls-wrapper');
var elCalendarBox = $('#calendar-wrapper');
var elAbilityList = $('#ability-list');
var elSkillLevelBox = $('#skill-level-wrapper');
var elFinalReviewBox = $('#final-review-wrapper');
var elTripBox = $('#trip-wrapper');
var elSubmitButton = $('#submit');
var elNextButton = $('#next');
var elStartOver = $('#startOver');
var elTripForward = $('#tripForward');
var elTripBack = $('#tripBack');
var newAbilityLevel;
var incMove = 0;
var elCurrentTrip = 0;
var state = {
	currentStep: 0,
	currentSelectionDate: [],
	currentSelectionAbility: [],
};

// landing page and start button trigger
elStartButton.click( function(event) {
	state.currentStep++;
	startTripFinder();
	datePickerStart();
});

function datePickerStart() {
	elDatePicker.datepicker( {
	});
};

function startTripFinder() {
	elLandingBox.addClass('hidden');
	elControlBox.removeClass('hidden');
	elCalendarBox.removeClass('hidden');
};

// control panel buttons to select date, ability, and to submit the GET
elNextButton.click( function(event) {
	renderCurrentStep();
	renderFinalReview();
	state.currentStep++;
});

elStartOver.click( function(event) {
	location.reload(true);
});

function progressbar() {
  $( "#progressbar" ).progressbar({
    value: 37
  });
};

elSubmitButton.click( function(event) {
	progressbar();
	renderCurrentStep();
	elSubmitButton.addClass('hidden');
	elTripForward.removeClass('hidden');
	getDataFromApi();
});

// UI rendering logic
function renderCurrentStep(currentStep) {
	if (state.currentStep == 1) {
		elSkillLevelBox.removeClass('hidden');
		elCalendarBox.addClass('hidden');
		currentSelectionDate();
	}

	if (state.currentStep == 2) {
		elNextButton.addClass('hidden');
		elSubmitButton.removeClass('hidden');
		elFinalReviewBox.removeClass('hidden');
		elSkillLevelBox.addClass('hidden');
		currentSelectionAbility();
	}

	if (state.currentStep == 3) {
		elFinalReviewBox.addClass('hidden');
		elTripBox.removeClass('hidden');
	}
};

// change it to an object currentSelectionDate.date = jQuery Element
// current selection state memory function

function currentSelectionDate() {
	state.currentSelectionDate.push( {
		date: $('#datepicker').val()
	});
};

function currentSelectionAbility() {
	state.currentSelectionAbility.push( {
		abilityLevel: $('#ability-level').val()
	});
};
	
// render final review before submit function so the user can see their selections
function renderFinalReview(currentStep) {
	if (state.currentStep == 2) {
	elFinalReviewBox.html("<h2>You selected:</h2>\
		<p>Date: " + state.currentSelectionDate[0].date + "</p>\
		<p>Experience Level: " + state.currentSelectionAbility[0].abilityLevel + "</p>\
		<p>Click SUBMIT to search your trips");
	};
};

var elLastTrip;

// ajax GET request
function getDataFromApi() {
	var wsTripFinderAPI = "/trip-finder";
	$.getJSON( wsTripFinderAPI, {
		format: 'json',
		date: state.currentSelectionDate[0],
		abilityLevel: state.currentSelectionAbility[0]
		})

		.done( function(data) {
		//forward and back toggle handle button logic	
			elLastTrip = data.trips.length;
		//logic for "no results" response
			if (data.trips[0] == undefined) {
				$('#trip-wrapper').html(
				'<div id="nameOfTripStyle" style="text-align: center; padding: 2%;"> \
				Sorry, there are not any trips at that time.  Please search again!</div>'
				)
			}

			else {
			// creating variables to format the dates from the start date and end date arrays
				var newTripListS = data.trips[incMove].startTrip;
				var newTripListE = data.trips[incMove].endTrip;

			// creating a new date list based off of items in the array
			function createDateList(data) {	
				$('#tripDatesStyle').append("<ul>Trip dates: </ul>");
					for(var i in newTripListS) {
    				var li = "<li>";
    				$("ul").append(li.concat(newTripListS[i] + " - " + newTripListE[i]))
					}				
			};
			
			// returning the json object from the GET request to the user
			$('#trip-wrapper').html(
				'<div id="nameOfTripStyle">' + data.trips[incMove].nameOfTrip + '</div>' +
				'<div id="imgStyleDiv"><img id="imgStyle" src="'+ data.trips[incMove].img +'" alt="BB"></div>' +
				'<div id="descriptionStyle">' + data.trips[incMove].description + '</div>' +
				'<div id="locationExperienceDateUrlWrapper">' +
				'<div id="tripDatesStyle"></div>' +
				'<div id="locationStyle">Location: ' + data.trips[incMove].location + '</div>' +
				'<div id="abilityLevelStyle">Experience Level: ' + data.trips[incMove].abilityLevel + '</div>' +
				'<div id="urlStyle"><a href="' + data.trips[incMove].url + 
				'" target="_blank"><button>Find Out More!</button></a></div>' +
				'</div>'
			);
			createDateList();
			};
		});
};

// toggle buttons to search through trips that have been returned from the GET request
elTripForward.click( function(event) {
	incMove ++;
	getDataFromApi();
	console.log(elCurrentTrip);
	elCurrentTrip++;
	if (elCurrentTrip != 0) {
		elTripBack.removeClass('hidden');
	}
	if (elCurrentTrip == elLastTrip-1) {
		elTripForward.addClass('hidden');
	}
});

elTripBack.click( function(event) {
	incMove--;
	getDataFromApi();
	console.log(elCurrentTrip);
	elCurrentTrip--;
	if (elCurrentTrip != elLastTrip-1) {
		elTripForward.removeClass('hidden');
	}
	if (elCurrentTrip == 0) {
		elTripBack.addClass('hidden');
	}
});
			