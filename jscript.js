//event listener for the search button to execute ajax calls and fetch data
$("#submit-button").on("click", function (event) {
	event.preventDefault()

	//need to clear input field
	// $("#user-input").val();
	//kanjialive only accepts searches in lower case
	queryTerm = $("#user-input").val().toLowerCase();

	//all code to fetch data from the API
	fetchApiData(queryTerm);
})

//Create array to store kanji searches and display them on the screen as clickable elements
var savedKanjiArr = JSON.parse(localStorage.getItem("saved-kanji")) || [];

//on page load, if there is any saved history, make search history buttons
for (var i = 0; i < savedKanjiArr.length; i++) {
	var buttonEl = $("<button>");
	$(buttonEl).text(savedKanjiArr[i].specificKanji);
	$(buttonEl).addClass("saved-search-button");
	$(buttonEl).attr("data-meaning", savedKanjiArr[i].kanjiMeaning);
	$("#search-history").prepend(buttonEl);
}


//save the kanji and the search term/english meaning into an object
//push the object into an array
//check if the searched kanji is in the object already using arrow functions
function saveKanji(savedKanji) {
	//if the search is not already in the saved kanji array...
	if (!savedKanjiArr.some(e => e.specificKanji === savedKanji.specificKanji)) {
		//push saved kanji into array
		savedKanjiArr.push(savedKanji);

		//display the kanji into the #search-history box
		var buttonElToo = $("<button>");
		$(buttonElToo).text(savedKanji.specificKanji);
		$(buttonElToo).addClass("saved-search-button");
		$(buttonElToo).attr("data-meaning", savedKanji.kanjiMeaning);
		$("#search-history").prepend(buttonElToo);

		//add saved kanji searches into local storage
		localStorage.setItem("saved-kanji", JSON.stringify(savedKanjiArr));
	}
};

//saved kanji search functionality/event listener
$("#search-history").on("click", "button", function () {
	// var whichKanji = $(this).text();
	var kanjiMeaning = $(this).data().meaning;

	//send which Kanji was clicked to the fetchApiData function
	fetchApiData(kanjiMeaning);
})

//create clear button, should be shown if there is anything in the array
var buttonEl = $('<button>');
buttonEl.text('Clear Searches');
buttonEl.attr('id', 'clear-button');
$('#history').append(buttonEl);
showClearBtn();

//if there are previous searches saved, show the clear button
function showClearBtn() {
	if (savedKanjiArr.length === 0) {
		$('#clear-button').css('visibility', 'hidden');
	} else {
		$('#clear-button').css('visibility', 'visible');
	}
}

//event listener for clear searches button, clears local storage, saved searches, and saved kanji array
$('#clear-button').on('click', function () {
	savedKanjiArr = [];
	localStorage.clear();
	$('.saved-search-button').remove();
	showClearBtn();
})

//function to fetch all data from APIs
function fetchApiData(queryTerm) {
	//empty out any existing data from previous searches from containers
	$("#image-base").empty()
	$("#kanji-base").empty()



	//This call is copied from the KanjiAlive Api, advanced search KEM/english meaning
	//first AJAX call to retrieve kanji from meaning
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": `https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/?kem=${queryTerm}`,
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "9df5add180mshd864f1707e5c655p1f0599jsn09d6675716fd",
			"x-rapidapi-host": "kanjialive-api.p.rapidapi.com"
		}
	};

	//first ajax call
	$.ajax(settings).done(function (response) {

		//currentKanji grabs the kanji character from the english meaning and tracks the english meaning with it
		var currentKanji = {
			specificKanji : response[0].kanji.character,
			kanjiMeaning : queryTerm
		}

		//save the kanji returned from the searched meaning to the saved searches
		saveKanji(currentKanji);
		showClearBtn();

		//This call is copied from the KanjiAlive Api, basic search/Kanji
		//second AJAX call to retrive metadata
		const settingsTwo = {
			"async": true,
			"crossDomain": true,
			"url": "https://kanjialive-api.p.rapidapi.com/api/public/kanji/" + currentKanji.specificKanji,
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "67f88684dbmsh6cde93c08d2115ep19d2aejsn2098e6786d5d",
				"x-rapidapi-host": "kanjialive-api.p.rapidapi.com"
			}
		};
		//second ajax call
		$.ajax(settingsTwo).done(function (responseTwo) {
			//creates a new p-tag to display the kanji
			var newCharecter = $("<p>")

			//grabs the kanji and displays it
			var kanjiCharecter = responseTwo.kanji.character
			newCharecter.text(kanjiCharecter)
			$("#kanji-base").append(newCharecter)

			//creates a new p-tag to display the romaji
			var newCharectertwo = $("<p>")

			//grabs the romaji and displays it
			var romajiCharecter = responseTwo.kanji.kunyomi.romaji
			newCharectertwo.text(romajiCharecter)
			$("#kanji-base").append(newCharectertwo)
		});

	});

	//start unsplash calls here
	//unsplash API key, url, and query term
	var authKey = "Uc5pwx1S972kG1H6z2IAy-29aDh3dWeqJpNz9UCF2v8";
	var queryURLtwo = "https://api.unsplash.com/photos/random?client_id=" + authKey;
	var newURL = queryURLtwo + "&query=" + queryTerm;

	//ajax call to fetch and image seeded with the search term
	$.ajax({
		url: newURL,
		method: "GET"
	}).then(function (picture) {
		//new image element to house the returned image
		var newImage = $("<img>")

		//url from response for the image, displays on page
		var selectedImg = picture.urls.small
		newImage.attr("src", selectedImg)
		$("#image-base").append(newImage)
	})
};

//=====================================================================
//GAME MODE

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

console.log(kanjiGameObject.length);

// initialize variable for global scope
var randomKanji;
var score = 0;
var answerP = $("<p>")
$("#answer-hr").css("visibility", "hidden");

// function to randomly produce a question from the array
//TODO: Store randomKanji index, check each new random num against the old list and if its there already, pick a new one
function randomKanjiGame() {
	// random number to select a question set from the game object
	randomKanji = Math.floor(Math.random()*kanjiGameObject.length);

	// display the kanji on the page
	$('#kanji-game-base').children().text(kanjiGameObject[randomKanji].kanji);

	// set the answers into the answers cells
	$('#option1').text(kanjiGameObject[randomKanji].answers[0]);
	$('#option2').text(kanjiGameObject[randomKanji].answers[1]);
	$('#option3').text(kanjiGameObject[randomKanji].answers[2]);
	$('#option4').text(kanjiGameObject[randomKanji].answers[3]);
};

// click event listener for start game button
$("#start-game").on("click", function() {
	score = 0;
	randomKanjiGame();

	// remove start game button when clicked
	//TODO: $("#start-game").remove();
});

//TODO: Click event on the list of answers, check 'this' button against the meaning from the object
$("#answers").on("click","button",function() {
	console.log($(this).text());
	console.log(randomKanji);
	console.log(kanjiGameObject[randomKanji].correctAnswer);

	//check to see if button clicked is correct
	if ($(this).text() == kanjiGameObject[randomKanji].correctAnswer) {
		console.log('yay!');
		score++;
		answerP.text('Correct!');
		$("#answer-hr").css("visibility", "visible");
		$("#answers").append(answerP);
	} else {
		console.log('boo!');
		$("#answer-hr").css("visibility", "visible");
		answerP.text('Wrong!');
		$("#answers").append(answerP);
	}

	// displays the results and then brings up the next question after 2 seconds, clears previous feedback
	setTimeout(function(){
		//TODO: clear out the hr and the response
		answerP.text('');
		$("#answer-hr").css("visibility", "hidden");
		randomKanjiGame();
	}, 2000);
})

//TODO: If 'this' button amtches the correct answer, then display CORRECT and increase the score by 1
//TODO: If 'this' button does not match the correct answers, display INCORRECT and do not increase the score
//TODO: Store the answers in an object with their answer and the correct answer
//TODO: Display at the end their answer and the correct answer saying "You answered X incorrect, here is what you answered, here is the correct answer"
//TODO: Restart quiz button, clear any cached info about the quiz/answers


//TODO: BONUS: Randomly pull a kanji from kanjiapi, pull meaning from that, generate three random words (from an array of words or a dictionary api), append the three answers and the meaning in a random order
//TODO: BONUS: Click event on the list of answers, check 'this' button against the meaning from the kanjiapi
