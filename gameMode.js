// HINTS - for if your stuck

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
var correctAnswerArr = [];
var randomKanjiArr = [];
var userAnswerArr = [];

// initialize counters
var score = 0;
var wrongAnswer = 0;
var correctAnswer = 0;
var setCount = 0;

// initialize new html elements
var answerP = $("<p>")
$("#answers-base").css("visibility", "hidden");

//TODO: 
// FIRST CONDITION - doesnt allow questions back to back
// SECOND CONDITION - checks if the ranval length < total questions length
// FINAL CONDITION - if ranval length > total questions, restart using questions
//TODO: BONUS: Include multiples of the total questions length - currentSet track multiples of that
//TODO: BONUS: Remove correctly answered questions from the pool
//TODO: BONUS: Create an array containing the list of answers
//TODO: BONUS: Shuffle that array, using https://javascript.info/task/shuffle
//TODO: BONUS: Then assign the values to each index as needed
// function to randomly produce a question from the array
function randomKanjiGame() {
    // random number to select a question set from the game object
    randomKanji = Math.floor(Math.random() * kanjiGameObject.length);

    var notRepeat = false;
    var kanjiCount = 0;

    while (notRepeat === false) {
        // filters the kanji array to see how many times an item has been displayed and returns the length of the filtered array for comparison
        kanjiCount = randomKanjiArr.filter((v) => (v === kanjiGameObject[randomKanji].kanji)).length;
        
        // if the last value chosen is the same as the new value
        if (randomKanjiArr[randomKanjiArr.length - 1] === kanjiGameObject[randomKanji].kanji) {
            // get a new value
            randomKanji = Math.floor(Math.random() * kanjiGameObject.length);
        }
        // if the new value is inside the old array and the length of new array is less than the total number of questions in the game object
        // ie not every kanji has been displayed yet
        else if (randomKanjiArr.includes(kanjiGameObject[randomKanji].kanji) && randomKanjiArr.length < kanjiGameObject.length) {
            // get a new value
            randomKanji = Math.floor(Math.random() * kanjiGameObject.length);
        }
        // if array of saved kanji is longer than the array of questions and the number of times the random kanji appears in the array is less than or equal to the set count
        else if (randomKanjiArr.length >= kanjiGameObject.length && kanjiCount > setCount) {
            randomKanji = Math.floor(Math.random() * kanjiGameObject.length);
        }
        // new kanji is not inside the old array, nor is it a duplicate, and it has not previously been asked, exit the loop
        else {
            notRepeat = true;
        };
    };

    // display the kanji on the page
    $('#kanji-game-display').text(kanjiGameObject[randomKanji].kanji);

    // set the answers into the answers cells
    $('#option1').text(kanjiGameObject[randomKanji].answers[0]);
    $('#option2').text(kanjiGameObject[randomKanji].answers[1]);
    $('#option3').text(kanjiGameObject[randomKanji].answers[2]);
    $('#option4').text(kanjiGameObject[randomKanji].answers[3]);

    // grab the correct answer from the array and the kanji
    // randomKanji and new var for just the correct answer
    correctAnswerArr.push(kanjiGameObject[randomKanji].correctAnswer);
    randomKanjiArr.push(kanjiGameObject[randomKanji].kanji)

    // track how many times the game set is played through for multiple unique rounds
    setCount = Math.floor(randomKanjiArr.length/kanjiGameObject.length);

    // display answers for testing
    console.log('answer', correctAnswerArr);
    console.log('kanji', randomKanjiArr);
};

// click event listener for start game button
$("#start-game").on("click", function () {
    score = 0;
    randomKanjiGame();
    $(".disposable").remove();
    $("#answers-base").css("visibility", "visible");

    // remove start game button when clicked
    $("#start-game").remove();

    // add end game button
    endGameButton();
});

// function for ending the game early
function endGameButton() {
    var endButton = $("<button>");
    endButton.text("End Game");
    endButton.addClass("button is-dark is-align-content-flex-end disposable");
    endButton.attr("id", "end-game");
    $("#kanji-game-base").append(endButton);

    $("#end-game").on("click", function () {
        $('#kanji-game-display').text('Fin');
        $("#answers").css("visibility", "hidden");
        $(".disposable").remove();
        gameOver();

        return;
    });
};


// click event on the list of answers, check 'this' button against the meaning from the object
$("#answers").on("click", "button", function () {
    // grab the users input
    userAnswerArr.push($(this).text());
    console.log('user input', userAnswerArr);

    // check to see if button clicked is correct and track the score, number of right answers, and number of wrong anwers
    // display the score
    if ($(this).text() == kanjiGameObject[randomKanji].correctAnswer) {
        score++;
        correctAnswer++;

        answerP.text('Correct!');
        $("#score-flip").append(answerP);
        $("#score-span").text(`Score: ${score}`);
    } else {
        score--;
        wrongAnswer++;

        // no negative scores allowed
        if (score < 0) {
            score = 0;
        }

        answerP.text('Wrong!');
        $("#score-flip").append(answerP);
        $("#score-span").text(`Score: ${score}`);
    }

    // displays if the answer is right or wrong for 2 seconds
    setTimeout(function () {
        // clears out the hr and the response
        answerP.text('');
        $("#answer-hr").css("visibility", "hidden");
    }, 2000);

    // summon gameover screen and end game if score is 10
    if (score >= 2) {
        $('#kanji-game-display').text('Fin');
        $("#answers").css("visibility", "hidden");
        $(".disposable").remove();
        gameOver();

        return;
        // display score
    };

    // fetches the next question
    randomKanjiGame();
});

function gameOver() {
    // create and append the restart button
    var restartButtonEl = $("<button>");
    restartButtonEl.addClass("button is-dark disposable");
    restartButtonEl.attr("id", "restart-button");
    restartButtonEl.text("Go Again!");
    $("#kanji-game-base").append(restartButtonEl);

    // review answers list
    var ulEl = $('<ul>');
    ulEl.addClass("flip list-text disposable");
    for (var i = 0; i < userAnswerArr.length; i++) {
        var liEl = $('<li>');
        liEl.text(`Kanji: ${randomKanjiArr[i]}, Correct Answer: ${correctAnswerArr[i]}, Your Answer: ${userAnswerArr[i]}`);
        ulEl.append(liEl);
    };

    var answerTallyP = $('<p>');
    answerTallyP.text(`Total Correct Answers: ${correctAnswer},  Total Wrong Answers: ${wrongAnswer}`);
    answerTallyP.addClass('disposable tally-text flip');

    $("#answers-base").prepend(ulEl);
    $("#answers-base").prepend(answerTallyP);
    $("#answers-base").css("overflow","auto");

    // start review text
    var reviewP = $('<p>');
    reviewP.text(`Let's Review:`);
    reviewP.addClass("flip review-text");
    $("#answers-base").prepend(reviewP);

    // restart button event listener
    $("#restart-button").on("click", function () {

        // reset trackers
        score = 0;
        correctAnswer = 0;
        wrongAnswer = 0;
        notRepeat = false;

        // reset answer review arrays
        correctAnswerArr = [];
        randomKanjiArr = [];
        userAnswerArr = [];

        // remove text
        reviewP.remove();

        // reset scrolling
        $("#answers-base").css("overflow","visible");

        // reset visibility
        $("#answers").css("visibility", "visible");
        $(".disposable").remove();

        // restart game
        randomKanjiGame();
        $("#score-span").text(`Score: ${score}`);

        // reset end game button
        endGameButton();
    });
};