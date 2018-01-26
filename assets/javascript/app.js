
var timeOutID;


var kangarooQuestions = [
	{ 
		"question" : "What sport do Kangaroos Play?", 
		"correctAnswer" : "Boxing",
		"answers" : ["Bowling", "Basketball", "Track", "Boxing"] 
	},
	{
		"question" : "How Fast Can Kangaroos Hop?", 
		"correctAnswer" : "20 mph",
		"answers" : ["20 mph", " 17 mph", "10 mph", "16.43 mph"] 
	},
	{ 
		"question" : "What is a Female Kangaroo Called?", 
		"correctAnswer" : "Doe",
		"answers" : ["Barbara", "Doe", "Jill", "Queen"] 
	},
	{
		"question" : "In Which US State Can You See Kangaroos?", 
		"correctAnswer" : "Virginia",
		"answers" : ["Texas", "Hawaii", "Virginia", "Montana"] 
	},
	{ 
		"question" : "What is a group of Kangaroos Called?", 
		"correctAnswer" : "Mob",
		"answers" : ["Pack", "Squall", "Mob", "Group"] 
	}
];



function displayQuestion(questionIndex){

	///Make sure the question-area has the class of displayed-content
	if($("#question-area").hasClass("displayed-content")){
		$("#question-bar").text(kangarooQuestions[questionIndex].question);
		for(var i = 0; i < kangarooQuestions[questionIndex].answers.length; i++){
			$("#" + i).text(kangarooQuestions[questionIndex].answers[i]);
		}
	}
	else{
		console.log("Something isn't right.");
	}

	///If a user clicks on an answer in the allotted time
	///Function For Handling user's answer
	$(".answer").on("click", function(){
		console.log(parseInt(this.id));
		checkAnswer(questionIndex, parseInt(this.id));
	});

	///Set a Timeout function to perform a countdown for 5 seconds. 
	timeOutID = setTimeout(function(){
		///If a user clicks on an answer in the allotted time
		///Function For Handling user's answer

		//Won't use 
		checkAnswer(-1,-1);

	}, 10 * 1000); 
}

displayQuestion(3);

function switchDisplays(displayed, hidden){
	//When a user clicks an answer we switch divs
	//Hidden area displays none of it's tags 
	$(hidden).removeClass("displayed-Content");
	$(hidden).addClass("hidden-content");
	//Displayed area becomes unhidden and displays it's content.
	$(displayed).removeClass("hidden-content");
	$(displayed).addClass("displayed-content");

}


function checkAnswer(questionIndex, answerIndex){
	switchDisplays("#result-area", "#question-area");
	///Clears the Timer
	clearTimeout(timeOutID);

	if(questionIndex === -1){
		///Display you are wrong. 
		$("#guess-result").text("You Did Not Answer In Time.");
		return;
	}

	console.log("The number of the question" + questionIndex); 
	console.log("The correct answer is " + kangarooQuestions[questionIndex].correctAnswer);
	console.log("The array of answers is " + kangarooQuestions[questionIndex].answers[answerIndex]);


	alert("You have answered Something or Timed Out");

	///If you have the correct answer. Display you are correct
	if(kangarooQuestions[questionIndex].answers[answerIndex] === kangarooQuestions[questionIndex].correctAnswer){
		$("#guess-result").text("You Are Correct.");
	}
	else{
		///Display you are wrong. 
		$("#guess-result").text("You Are Wrong.");
	}

}

function showQuestion(index){
	///
	if($("#question-area").hasClass("displayed-content")){
		$("#question-bar").text(kangarooQuestions[index].question);
	}
	else{
		console.log("Something isn't right.");
	}
}
