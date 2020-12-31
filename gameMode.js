// push the randomized index into an array of numbers
// compare that array of numbers and see if the new randomized value is
// included (includes()) and the length of the randomized values is less
// than the length of the questions array, pick a new value


// FIRST CONDITION - doesnt allow questions back to back
// SECOND CONDITION - checks if the ranval length < total questions length
// FINAL CONDITION - if ranval length > total questions, restart using questions
// BONUS - include multiples of the total questions length - currentSet track multiples of that
// BONUS - remove correctly answered questions from the pool

// HINTS - for if your stuck
// End Game button to break cycle

// Array of objects of kanji with their meaning and 3 incorrect answers and the correct answered marked
var kanjiGameObject = [{
	kanji: '蛍',
	answers: ['mountain', 'spirit', 'orange', 'firefly'],
	correctAnswer: 'firefly'
},
{
	kanji: '蜜',
	answers: ['fish', 'honey', 'train', 'sky'],
	correctAnswer: 'honey'
},
{
	kanji: '山',
	answers: ['mountain', 'heart', 'ocean', 'forest'],
	correctAnswer: 'mountain'
},
{
	kanji: '気',
	answers: ['ogre', 'plain', 'spirit', 'coffee'],
	correctAnswer: 'spirit'
},
{
	kanji: '魚',
	answers: ['water', 'fish', 'speak', 'jacket'],
	correctAnswer: 'fish'
},
{
	kanji: '心',
	answers: ['computer', 'desk', 'heart', 'bag'],
	correctAnswer: 'heart'
},
{
	kanji: '店',
	answers: ['shop', 'marker', 'game', 'shoes'],
	correctAnswer: 'shop'
},
{
	kanji: '家',
	answers: ['pants', 'restaurant', 'book', 'house'],
	correctAnswer: 'house'
},
{
	kanji: '猿',
	answers: ['sauce', 'monkey', 'menu', 'festival'],
	correctAnswer: 'monkey'
},
{
	kanji: '雪',
	answers: ['snow', 'summer', 'light', 'window'],
	correctAnswer: 'snow'
},
{
	kanji: '雨',
	answers: ['rain', 'heat', 'animal', 'doctor'],
	correctAnswer: 'rain'
},
{
	kanji: '夏',
	answers: ['merchant', 'summer', 'luck', 'dragon'],
	correctAnswer: 'summer'
},
{
	kanji: '舟',
	answers: ['tree', 'car', 'office', 'boat'],
	correctAnswer: 'boat'
},
{
	kanji: '言',
	answers: ['word', 'drink', 'table', 'notebook'],
	correctAnswer: 'word'
},
{
	kanji: '本',
	answers: ['taxi', 'book', 'cat', 'food'],
	correctAnswer: 'book'
},
]

//TODO: BONUS: On loadup run a function to fetch 25 random kanji and fetch 75 random words, this is to eliminate downtime (while the user is familiarizing themselves with the page, JS can run in the background to generate this array and begin the quiz/game portion, more efficient)

// initialize variables for global scope
var randomKanji;
var score = 0;
var wrongAnswer = 0;
var correctAnswer = 0;
var answerP = $("<p>")
$("#answer-hr").css("visibility", "hidden");
$("#answers-base").css("visibility", "hidden");

// function to randomly produce a question from the array
//TODO: Store randomKanji index, check each new random num against the old list and if its there already, pick a new one
function randomKanjiGame() {
	// random number to select a question set from the game object
	randomKanji = Math.floor(Math.random() * kanjiGameObject.length);

	//TODO: BONUS: Create an array containing the list of answers
	//TODO: BONUS: Shuffle that array, using https://javascript.info/task/shuffle
	//TODO: BONUS: Then assign the values to each index as needed

	// display the kanji on the page
	$('#kanji-game-base').children().text(kanjiGameObject[randomKanji].kanji);

	// set the answers into the answers cells
	$('#option1').text(kanjiGameObject[randomKanji].answers[0]);
	$('#option2').text(kanjiGameObject[randomKanji].answers[1]);
	$('#option3').text(kanjiGameObject[randomKanji].answers[2]);
	$('#option4').text(kanjiGameObject[randomKanji].answers[3]);
};

// click event listener for start game button
$("#start-game").on("click", function () {
	score = 0;
	randomKanjiGame();
	$("#answers-base").css("visibility", "visible");

	// remove start game button when clicked
	$("#start-game").remove();
});

// click event on the list of answers, check 'this' button against the meaning from the object
$("#answers").on("click", "button", function () {
	console.log($(this).text());
	console.log(randomKanji);
	console.log(kanjiGameObject[randomKanji].correctAnswer);

	// check to see if button clicked is correct and track the score, number of right answers, and number of wrong anwers
	// display the score
	if ($(this).text() == kanjiGameObject[randomKanji].correctAnswer) {
		score++;
		correctAnswer++;

		answerP.text('Correct!');
		$("#answer-hr").css("visibility", "visible");
		$("#answers").append(answerP);
		$("#score-span").text(`Score: ${score}`);
	} else {
		score--;
		wrongAnswer++;

		// no negative scores allowed
		if (score < 0) {
			score = 0;
		}

		answerP.text('Wrong!');
		$("#answer-hr").css("visibility", "visible");
		$("#answers").append(answerP);
		$("#score-span").text(`Score: ${score}`);
	}

	// displays if the answer is right or wrong for 2 seconds
	setTimeout(function () {
		// clears out the hr and the response
		answerP.text('');
		$("#answer-hr").css("visibility", "hidden");
	}, 2000);

	// summon gameover screen and end game if score is 10
	if (score >= 1) {
		gameOver();
	}

	// fetches the next question
	randomKanjiGame();
})

function gameOver() {
    $('#kanji-game-base').children().text('');
	// create and append the restart button
	var restartButtonEl = $("<button>");
	restartButtonEl.text("Go Again!");
    restartButtonEl.attr("id", "restart-button");
    restartButtonEl.addClass("button is-dark")
	$("#kanji-game-base").append(restartButtonEl);

	// turn off answers
	$("#answers-base").css("visibility", "hidden");

	//TODO: display summary or results and wrong questions
}

// restart button event listener
$("#restart-button").on("click", function () {
	// reset trackers
	score = 0;
	correctAnswer = 0;
	wrongAnswer = 0;

	// restart game
	randomKanjiGame();

	// turn on the answers
	$("#answers-base").css("visibility", "visible");

});

//TODO: Store the answers in an object with their answer and the correct answer
//TODO: Display at the end their answer and the correct answer saying "You answered X incorrect, here is what you answered, here is the correct answer"
//TODO: Restart quiz button, clear any cached info about the quiz/answers


//TODO: BONUS: Randomly pull a kanji from kanjiapi, pull meaning from that, generate three random words (from an array of words or a dictionary api), append the three answers and the meaning in a random order
//TODO: BONUS: Click event on the list of answers, check 'this' button against the meaning from the kanjiapi
