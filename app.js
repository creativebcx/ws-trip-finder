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
var elBackButton = $('#back');
var state = {
	currentStep: 0,
	currentSelectionDate: [],
	currentSelectionAbility: []
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
	currentSelection();
	state.currentStep++;
});

elBackButton.click( function(event) {
	renderCurrentStep();
	if (state.currentStep != 0) {
		state.currentStep--;
		};
});

elSubmitButton.click( function(event) {
	renderCurrentStep();
});

function renderCurrentStep(currentStep) {
	console.log(state.currentStep);
	if (state.currentStep == 1) {
		elSkillLevelBox.removeClass('hidden');
		elCalendarBox.addClass('hidden');
		}
	if (state.currentStep == 2) {
		elNextButton.addClass('hidden');
		elSubmitButton.removeClass('hidden');
		elFinalReviewBox.removeClass('hidden');
		elSkillLevelBox.addClass('hidden');
	}
	if (state.currentStep == 3) {
		elFinalReviewBox.addClass('hidden');
		elTripBox.removeClass('hidden');
	}
};

// current selection state memory function
function currentSelection() {
	event.preventDefault();
	state.currentSelectionDate.push( {
		date: $('#datepicker').val()
	});
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
















