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

//TODO: variables ???

// var authKey = "Uc5pwx1S972kG1H6z2IAy-29aDh3dWeqJpNz9UCF2v8";

// // var queryTerm = ""
// //TODO: make search dynamic from user input
// //var queryURL = "https://api.unsplash.com/photos/random?client_id=" + authKey + "&query=water";
// var queryURLtwo = "https://api.unsplash.com/photos/random?client_id=" + authKey;

// //TODO: create functions
// //var numResults =""

// //function runQuery(numResults, queryURL){

// //ajax call to unsplash to get photo


// 	//TODO: create button to grab info from user input
// $("#submit-button").on("click", function(event) {
// 	event.preventDefault()
// 	  $("#image-base").empty()

// 	  queryTerm = $("#user-input").val();

// 	  //console.log(queryTerm);

// 	  var newURL = queryURLtwo + "&query=" + queryTerm;

// 	  //console.log(newURL)


// 	  $.ajax({
// 		url: newURL,
// 		method: "GET"
// 	  }).then(function(picture){
// 		//get first search data from api 

// 		//console.log(picture);

// 		//console.log(picture.urls.small);
// 		// apply img to app

// 		var newImage = $("<img>")

// 		var selectedImg = picture.urls.small
// 		newImage.attr("src", selectedImg)

// 		$("#image-base").append(newImage)

// 		//console.log()





// 	  })




// 	//  return false;

//   })
