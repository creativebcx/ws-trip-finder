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
var state = {
	currentStep: 0,
	currentSelectionDate: [],
	currentSelectionAbility: [],
	testState : {
		nameOfTrip: "Big Bend & The Rio Grande", 
		url: "https://westernspirit.com/WSC_BB.php",
		img: "img/bigbend.jpg",
		description: "Off the beaten path, Big Bend National Park is an incredible playground in remote Texas. Imagine riding exhilerating trails & roads through the beautiful Chihuahuan Desert. We will be riding in both Big Bend State Park and Big Bend National Park and even paddling for a day on the famous Rio Grande.",
		location: "Texas",
		tripDates: {
			startTrip: "2/19/2018",
			endTrip: "2/23/2018"
		},
		abilityLevel: "Beginner"
	}
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

// moving forward or backwards with the currentStep function
elNextButton.click( function(event) {
	renderCurrentStep();
	renderFinalReview();
	state.currentStep++;
});

elStartOver.click( function(event) {
	location.reload(true);
	// old function to take step back
	/*renderCurrentStep();
	if (state.currentStep != 0) {
		state.currentStep--;
		};*/
});

elSubmitButton.click( function(event) {
	event.preventDefault();
	renderCurrentStep();
	elSubmitButton.addClass('hidden');
	// for testing - should replace with new DISPLAY function
	//testDisplaySearchResults();
	getDataFromApi();
});

function renderCurrentStep(currentStep) {
	console.log(state.currentStep);
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
	console.log(state.currentSelectionDate[0].date);
};

function currentSelectionAbility() {
	state.currentSelectionAbility.push( {
		abilityLevel: $('#ability-level').val()
	});
	console.log(state.currentSelectionAbility[0].abilityLevel);
};
// render final review before submit function

function renderFinalReview(currentStep) {
	if (state.currentStep == 2) {
	elFinalReviewBox.html("<h2>You selected:<br><br></h2>\
		<p>Date: " + state.currentSelectionDate[0].date + "<br><br></p>\
		<p>Ability Level: " + state.currentSelectionAbility[0].abilityLevel + "<br><br></p>\
		<p>Click SUBMIT to search your trips");
	};
};

function getDataFromApi(searchTerm, callback) {
	/*$.getJSON( "https://secure-bastion-80953.herokuapp.com/trip-finder", function( data ) {
  		var items = [];
  		$.each( data, function( key, val ) {
    		items.push( "<li id='" + key + "'>" + val + "</li>" );
  		});
 
  		$( "<ul/>", {
    		"class": "my-new-list",
    		html: items.join( "" )
  		}).appendTo( "body" );
	});
*/
	$.ajax({
    	url: 'https://secure-bastion-80953.herokuapp.com/trip-finder',
   		headers: {
       	},
    	type: "GET",
    	dataType: "json",
    	data: {
    	},
    	success: function (result) {
        	testDisplaySearchResults()   
    	},
    	error: function () {
        	console.log("error");
    	}
	});
};

/*
// API response syntax
function displaySearchResults(data) {
	var resultElement = '';
	if (data.items) {
		data.items.forEach( function(item) {
			return resultElement;
		});
	};
};
*/

// testing response
function testDisplaySearchResults(data) {
	$('#trip-wrapper').html(
		'<div id="nameOfTripStyle">' + state.testState.nameOfTrip + '</div>' +
		'<div id="imgStyleDiv"><img id="imgStyle" src="'+ state.testState.img +'" alt="BB"></div>' +
		'<div id="descriptionStyle">' + state.testState.description + '</div>' +
		'<div id="locationStyle">Location: ' + state.testState.location + '</div>' +
		'<div id="tripDatesStyle"> Trip dates: ' + state.testState.tripDates.startTrip + ' to ' +
			state.testState.tripDates.endTrip + '</div>' +
		'<div id="abilityLevelStyle">Ability level: ' + state.testState.abilityLevel + '</div>' +
		'<div id="urlStyle"><a href="' + state.testState.url + '" target="_blank"><button>Find Out More!</button></a></div>'
		);
};

// currentStep testing function
$(document).click( function (event) {
	console.log('currentStep ' + state.currentStep);
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
















