
///Variables for Keeping Track of Timers. Score and Count of Questions. 
var questionTimeOutID;
var resultTimeOutID; 
var count = 0; 
var score = 0; 
//Plays The Audio At the The End of the Game. 
var audio = new Audio("assets/sounds/kangaroo-song.mp3");



/// Kangaroo Questions and Answers and Gifs. 
var kangarooQuestions = [
	{ 
		"question" : "What sport do Kangaroos Play?", 
		"correctAnswer" : "Boxing",
		"answers" : ["Bowling", "Basketball", "Track", "Boxing"],
		"rightGif" : "assets/images/buff-kangaroo.gif",
		"wrongGif" : "assets/images/nuts.gif" 
	},
	{
		"question" : "How Fast Can Kangaroos Hop?", 
		"correctAnswer" : "20 mph",
		"answers" : ["20 mph", " 17 mph", "10 mph", "16.43 mph"], 
		"rightGif" : "assets/images/guitar-kangaroo.gif", 
		"wrongGif" : "assets/images/sleeper-hold.gif" 
	},
	{ 
		"question" : "What is a Female Kangaroo Called?", 
		"correctAnswer" : "Doe",
		"answers" : ["Barbara", "Doe", "Jill", "Queen"], 
		"right-gif" : "assets/images/dog-kangaroo.gif",
		 "wrongGif" : "assets/images/trampoline.gif"
	},
	{
		"question" : "In Which US State Can You See Kangaroos?", 
		"correctAnswer" : "Virginia",
		"answers" : ["Texas", "Hawaii", "Virginia", "Montana"], 
		"rightGif" : "assets/images/swimming.gif", 
		"wrongGif" : "assets/images/splash.gif" 
	},
	{ 
		"question" : "What is a group of Kangaroos Called?", 
		"correctAnswer" : "Mob",
		"answers" : ["Pack", "Squall", "Mob", "Group"], 
		"rightGif" : "assets/images/cute.gif", 
		"wrongGif" : "assets/images/momma.gif"
	}
];

///Starts the Game At 0. 
displayQuestion(0);

///Displays The Question. Listens For onclick for user answer. 
///Sets a tiemout for use to answer in a correct amount of time. 
function displayQuestion(questionIndex){

	/// If the count is greater than the number of elements, display game over. 
	/// Switch Displays. And get out of the rest of the function. 
	if(count > kangarooQuestions.length - 1){
		clearTimeout(resultTimeOutID); 
		$("#score").text(score); 
		switchDisplays("#game-over-area", "#result-area");
		audio.play();
		return;
	}

	//clearTimeout(resultTimeOutID); 
	switchDisplays("#question-area", "#result-area");

	///Make sure the question-area has the class of displayed-content
	if($("#question-area").hasClass("displayed-content")){
		///Display Question and Answers
		$("#question-bar").text(kangarooQuestions[questionIndex].question);
		for(var i = 0; i < kangarooQuestions[questionIndex].answers.length; i++){
			$("#" + i).text(kangarooQuestions[questionIndex].answers[i]);
		}
	}
	else{
		console.log("Something isn't right.");
	}

	/// Increment Count for the Next Question.
	count++; 

	///If a user clicks on an answer in the allotted time
	///Function For Handling user's answer.
	$(".answer").on("click", function(){
		clearTimeout(resultTimeOutID);
		checkAnswer(questionIndex, parseInt(this.id));
		return; 
	});

	///Set a Timeout function to perform a countdown for 5 seconds. 
	questionTimeOutID = setTimeout(function(){
		clearTimeout(resultTimeOutID);
		///If a user does not click an answer in the allotted time Question index set to -1.
		checkAnswer(questionIndex,-1);
	}, 30 * 1000); 
}

////Switches one display from another.
/// If the question area is displayed, hide it and make result area displayed. (And Vice-Versa).
function switchDisplays(displayed, hidden){

	$(hidden).removeClass("displayed-Content");
	$(hidden).addClass("hidden-content");
	//Displayed area becomes unhidden and displays it's content.
	$(displayed).removeClass("hidden-content");
	$(displayed).addClass("displayed-content");

}


///Changes the display from question area to result-area. 
///Clears Timeout. 
///Displays appropriate response for correct, incorrect or timeout answers. 
function checkAnswer(questionIndex, answerIndex){

	switchDisplays("#result-area", "#question-area");

	clearTimeout(questionTimeOutID);

	if(answerIndex === -1){
		///Load appropriate gif. 
		$("#gif-area").attr("src", kangarooQuestions[questionIndex].wrongGif); 
		///If you did not reply in time question index will be -1. 
		/// Display did not answer in time. 
		$("#guess-result").text("You Did Not Answer In Time.");
	}
	else if(kangarooQuestions[questionIndex].answers[answerIndex] === kangarooQuestions[questionIndex].correctAnswer){
		score++; 
		///If you have the correct answer. Display you are correct
		///Load appropriate gif. 
		$("#gif-area").attr("src", kangarooQuestions[questionIndex].rightGif); 
		///If you have the correct answer. Display you are correct
		$("#guess-result").text("You Are Correct.");
	}
	else{
		///Load appropriate gif. 
		$("#gif-area").attr("src", kangarooQuestions[questionIndex].wrongGif); 
		///Display you are wrong.
		$("#guess-result").text("You Are Wrong.");
	}

	$("#correct-answer-area").text("The correct answer was " + kangarooQuestions[questionIndex].correctAnswer);

	resultTimeOutID = setTimeout(function(){
		console.log("The TimeOut is Running");
		displayQuestion(count); 
	}, 5 * 1000); 

}

