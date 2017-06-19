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
	state.currentSelectionDate.push( {
		date: $('#datepicker').val()
	});
	state.currentSelectionAbility.push( {
		abilityLevel: $('form').val()
	});
	console.log(state.currentSelectionAbility);
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
	console.log(state.currentStep);
});

/*
//copied code
var elButton = $('#start-button-handle');
var elStartButton = $('#start-button');
var elQuestionArea = $('.question-area');
var elSubmitButton = $('.submit');
var elBackButton = $('.back');
var elMoveForwardButton = $('.forward');
var toggle = $('.toggle');
var questionSet = 0;
var newValue = 0;
var correctA = 0;
var state = {
	isStarted: false,
	currentStep: 0,
	questions: [{
		text: "1/10. Which of the following is likely a measurement for the\
		waist size of a snowboard?",
		answer: [
			"100cm",
			"100mm", 
			"265mm",
			"265cm"
		],
		correctAnswer: [
			2,
			"265mm is, or 26.5cm is likely the waist width of a snowboard."],
	},
		
elButton.click( function(event) {
	startQuiz();
})
//calls function

function startQuiz() {
	elStartButton.addClass('hidden');
	elQuestionArea.removeClass('hidden');
	toggle.removeClass('hidden');
	state.isStarted = true;
	newQuestionAnswer();
	attachRadioHandler();
}
//wrapping our logic for hidden classes & changing "state"

elMoveForwardButton.click( function(event) {
	if (questionSet != state.questions.length - 1) {
		questionSet++;
		newQuestionAnswer();
		attachRadioHandler();
	}
	else {
		finalScore();
	};
	$('.message-area').html(
			" "
		);
});

elBackButton.click( function(event) {
	if (questionSet != 0) {
		questionSet--;
	};
	newQuestionAnswer();
});

elSubmitButton.click( function(event) {
	check();
	attachRadioHandler();
});

function newQuestionAnswer() {
	$('.question-area').html(
		'<div id="question">' + state.questions[questionSet].text + '</div>' +
		'<ul class="answer-list">' + 
			'<li>' + '<input value="0" name="answer" type="radio"/>' + '<span>' + 
				state.questions[questionSet].answer[0] + '</span>' + '</li>' +
			'<li>' + '<input value="1" name="answer" type="radio"/>' + '<span>' + 
				state.questions[questionSet].answer[1] + '</span>' + '</li>' +
			'<li>' + '<input value="2" name="answer" type="radio"/>' + '<span>' + 
				state.questions[questionSet].answer[2] + '</span>' + '</li>' +
			'<li>' + '<input value="3"name="answer" type="radio"/>' + '<span>' + 
				state.questions[questionSet].answer[3] + '</span>' + '</li>' +
			'</ul>');
};
function attachRadioHandler(event) {
		$('input[name="answer"]').change(function () {
			newValue = this.value;
		});
};	


function check() {
	if (validateAnswer()) {
		$('.message-area').html(
			"Correct Answer! : " + state.questions[questionSet].correctAnswer[1]
	)}
	else {
		$('.message-area').html(
			"incorrect answer"
		)
	};
	
};
	function validateAnswer() {
	console.log(questionSet)
	if (newValue == state.questions[questionSet].correctAnswer[0]) {
		correctA++;
		return true;
	}
	else {
		return false;
	}
};

function finalScore () {
	$('.question-area').html(
		"Your final score is " + correctA + " out of 10!"
		);
};

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
















