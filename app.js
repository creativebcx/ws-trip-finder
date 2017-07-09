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
var elTripBack = $('#tripBack')
var incMove = 0;
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
	elDatePicker.datepicker();
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

elSubmitButton.click( function(event) {
	event.preventDefault();
	//elInnerBox.css('background-image', 'none');
	//elbackgroundImg.css('background-image', '0.5');
	renderCurrentStep();
	elSubmitButton.addClass('hidden');
	elTripForward.removeClass('hidden');
	// for testing - should replace with new DISPLAY function
	//testDisplaySearchResults();
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
var newAbilityLevel;
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
		<p>Ability Level: " + state.currentSelectionAbility[0].abilityLevel + "</p>\
		<p>Click SUBMIT to search your trips");
	};
};

// ajax GET request
function getDataFromApi() {
	var wsTripFinderAPI = "https://secure-bastion-80953.herokuapp.com/trip-finder";
	$.getJSON( wsTripFinderAPI, {
		format: 'json',
		date: state.currentSelectionDate[0],
		abilityLevel: state.currentSelectionAbility[0]
		})
		.done( function( data ) {

			// creating variables to format the dates from the start date and end date arrays
				var newTripListS = data.trips[incMove].tripDates.startTrip;
				var newTripListE = data.trips[incMove].tripDates.endTrip;

			// creating a new date list based off of items in the array
			function createDateList (data) {	
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
				'<div id="locationStyle">Location: ' + data.trips[incMove].location + '</div>' +
				'<div id="tripDatesStyle"></div>' +
				'<div id="abilityLevelStyle">Ability level: ' + data.trips[incMove].abilityLevel + '</div>' +
				'<div id="urlStyle"><a href="' + data.trips[incMove].url + 
				'" target="_blank"><button>Find Out More!</button></a></div>'
			);
			createDateList();
		});
};

// toggle buttons to search through trips that have been returned from the GET request
elTripForward.click( function(event) {
	incMove++;
	elTripBack.removeClass('hidden');
	getDataFromApi();
});

elTripBack.click( function(event) {
	incMove--;
	getDataFromApi();
});

/*
// Start Bot Animations
$('.scroll-down').click(function(event) {
      event.preventDefault();
      $('body').animate({scrollTop:$(document).height()}, 3000);
      console.log('hello');
      //$('body').animate({opacity: 0.0}, 3000);
      $('#container-bot').css("display", "initial");
      $('#video').css("display", "initial");
      $('#bottom-tool').css("display", "initial");
      $('h2').css("display", "block");
      //$('body').css('background-image', 'none');
  });
// Animation for bot reply so that conversation stays on bot reply screen
$('input.cleverscriptsubmit').click(function(event) {
      setTimeout(function(){
          $('.cleverscriptreply').animate({scrollTop:$(document).height()}, 1000);
    }, 100);
});
*/
















