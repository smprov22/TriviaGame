//Global variables
//Questions and answers
var triviaQuestions = [{
    question: "What is the last name of the superhero family in The Incredibles movies?",
    answerList: ["Smith", "Byrd", "Parr", "Prow"],
    answer: 2
},
{   
    question: "Which character was not in the first Toy Story movie?",
    answerList: ["Buzz", "Jessie", "Hamm", "Rex"],
    answer: 1
},
{
    question: "Who voices Dory in Finding Nemo (and Finding Dory)?",
    answerList: ["Ellen Degeneres", "Oprah Winfrey", "Diane Keaton", "Anne Heche"],
    answer: 0
},
{
    question: "Which of these emotions is NOT a character in Inside Out?",
    answerList: ["Joy", "Fear", "Confusion", "Disgust"],
    answer: 2
},
{
    question: "What is the name of the bird that Carl and Russell find in Up?",
    answerList: ["Doug", "Fred", "Charles", "Kevin"],
    answer: 3
},
{
    question: "How long was WALL-E stranded on earth before EVE arrived?",
    answerList: ["700 years", "500 years", "1000 years", "300 years"],
    answer: 0
},
{
    question: "Monsters, Inc. takes place in which city?",
    answerList: ["Monstro City", "Screamsville", "Monsterville", "Monstropolis"],
    answer: 3
},
{
    question: "What was the name of the stray dog that Miguel befriended in Coco?",
    answerList: ["Juan", "Diego", "Dante", "Julio"],
    answer: 2
},
{
    question: "In what country does the movie Brave take place?",
    answerList: ["England", "Scotland", "France", "Ireland"],
    answer: 1
},
{
    question: "What was Nemo's moms name?",
    answerList: ["Flora", "Coral", "Star", "Pearl"],
    answer: 1
}]
var correctGuesses = 0;
var incorrectGuesses = 0;
var timeRemaining = 0;
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var userAnswer;
var answered;
var increment;
var counter;
//Array of all the gifs to be shown on the answer page
var gifs = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10"];
//Array of messages to be displayed on the answer page
// var messages = {
//     correct: "You got it! Great job!",
//     incorrect: "Not quite, time to watch more Pixar movies!",
//     unanswered: "Too slow! Guess faster next time!",
//     end: "Let's check out your final score!"
// }

//Start button
$("#startBtn").on("click", function() {
    $(this).hide();
    newGame();
})
//Play again button
$("#playAgainBtn").on("click", function(){
	$(this).hide();
	newGame();
});

//New Game function
    //Hide elements that aren't necessary yet
    //Set current question, correct answer, incorrect answer, and unanswered to 0
    //Call new question function

function newGame() {
    $("#finalMessage").empty();
	$("#numberCorrect").empty();
	$("#numberIncorrect").empty();
	$("#unanswered").empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

//New question function
    //Show time remaining and start countdown
    //Show question 1
    //Show options 
    //Record user answer
    //Call compare answer function

function newQuestion () {
    $('#message').empty();
	$('#correctAnswer').empty();
	$('#gif').empty();
    answered = true;
    
    $(".question").html("<h3>" + triviaQuestions[currentQuestion].question + "</h3>");
        for (var i = 0; i < 4; i++) {
            var choices = $("<div>");
            choices.text(triviaQuestions[currentQuestion].answerList[i]);
            choices.attr({"data-index": i});
            choices.addClass("selection");
            $(".answerList").append(choices);
        }
        countdown();
        //Choosing answer stops countdown and launches answer page
        $(".selection").on("click",function(){
            userAnswer = $(this).data("index");
            clearInterval(interval);
            answerPage();
        });
}

function countdown() {
    counter = 10;
    $("#timeRemaining").html("<h3>Time Remaining: " + counter + "</h3>");
	answered = true;
    interval = setInterval(showCountdown, 1000);
}

function showCountdown() {
	counter--;
	$("#timeRemaining").html("<h3>Time Remaining: " + counter + "</h3>");
	if(counter < 1){
		clearInterval(interval);
		answered = false;
		answerPage();
	}
}
//Answer Page
    //Decide if the user selected the correct answer
    //Declare a function to decide if the selected answer is correct
    //If answer is right, display right answer text, show gif, show correct answer, add to correct answer count
    //If answer is wrong, display incorrect answer text, show gif, show correct answer, add to incorrect answer count
    //If they run out of time, display time's up text, show gif, show correct answer, add to unanswered count
//Have loop continue to display questions 2-10
//Once all 10 questions are answered (or time expires), display score page
function answerPage() {
	$(".selection").empty(); //Clears question page
    $(".question").empty();
    
    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $("#gif").html('<img src = "assets/images/'+ gifs[currentQuestion] +'.gif" width = "300px">');
    //Check if user selection is correct answer
    if((userAnswer === rightAnswerIndex) && (answered === true)) {
        $("#message").html("You got it! Great job!");
        $("#correctAnswer").html("The correct answer was: " + rightAnswerText);
        correctAnswer++;
    }
    else if((userAnswer != rightAnswerIndex) && (answered === true)) {
        $("#message").html("Not quite, time to watch more Pixar movies!");
        $("#correctAnswer").html("The correct answer was: " + rightAnswerText);
        incorrectAnswer++
    }
    else {
        unanswered++
        $("#message").html("Too slow! Guess faster next time!");
        $("#correctAnswer").html("The correct answer was: " + rightAnswerText);
    }

    if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scorePage, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}
//On score page, hide questions, options, and answers
    //Display number of correct, incorrect, and unanswered questions
    //Have button with option to play again 
function scorePage() {
    $("#timeRemaining").empty();
	$("#message").empty();
	$("#correctAnswer").empty();
    $("#gif").empty();
    
    $("#finalMessage").html("Let's check out your final score!");
    $("#numberCorrect").html("Questions answered correctly: " + correctAnswer)
    $("#numberIncorrect").html("Questions answered incorrectly: " + incorrectAnswer)
    $("#unanswered").html("Unanswered questions: " + unanswered)
    $("#playAgainBtn").addClass("reset");
	$("#playAgainBtn").show();
	$("#playAgainBtn").html("Play Again?");
}