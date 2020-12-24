
//TODO: create api call kanjilive.






//Get a word from the input in english
//send that to the first AJAX call to retrieve a kanji
//Send that kanji to the second AJAX call to extract meta data about it

//This call is copied from the KanjiAlive Api, advanced search KEM/english meaning
//first AJAX call to retrieve kanji from meaning

$("#submit-button").on("click", function(event) {
	event.preventDefault()
	 $("#image-base").empty()
	 $("#kanji-base").empty()
	 queryTerm = $("#user-input").val().toLowerCase();
	  
	  console.log(queryTerm);
  
	 // var newURL = queryURLtwo + "&query=" + queryTerm;



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
	

	$.ajax(settings).done(function (response) {
	//console.log(response);
	var currentKanji = response[0].kanji.character;
	//console.log(currentKanji);

	saveKanji(currentKanji);
	//This call is copied from the KanjiAlive Api, basic search/Kanji
	//second AJAX call to retrive metadata
	const settingsTwo = {
		"async": true,
		"crossDomain": true,
		"url": "https://kanjialive-api.p.rapidapi.com/api/public/kanji/" + currentKanji,
		"method": "GET",
		"headers": {
		"x-rapidapi-key": "67f88684dbmsh6cde93c08d2115ep19d2aejsn2098e6786d5d",
		"x-rapidapi-host": "kanjialive-api.p.rapidapi.com"
		}
	};
		
	
		$.ajax(settingsTwo).done(function (responseTwo) {
			console.log(responseTwo);

			//var newImage = $("<img>")

	  		//var selectedImg = picture.urls.small
	  		//newImage.attr("src", selectedImg)
	
			//$("#image-base").append(newImage)
			
			var newCharecter = $("<p>")
			
			var kanjiCharecter = responseTwo.kanji.character
			newCharecter.text(kanjiCharecter)


			$("#kanji-base").append(newCharecter)
			
			//console.log(responseTwo.kanji.character)

			var newCharectertwo = $("<p>")
			
			var romajiCharecter= responseTwo.kanji.kunyomi.romaji
			newCharectertwo.text(romajiCharecter)


			$("#kanji-base").append(newCharectertwo)
			


			//var romajiText = responseTwo.kanji.kunyomi.romaji
			//console.log(responseTwo.kanji.kunyomi.romaji)

			console.log()





		});

	});
	
	
  
	//queryTerm = $("#user-input").val();
	
	//console.log(queryTerm);

	
	//console.log(newURL)
	var authKey = "Uc5pwx1S972kG1H6z2IAy-29aDh3dWeqJpNz9UCF2v8";
	
	// var queryTerm = ""
	//TODO: make search dynamic from user input
	//var queryURL = "https://api.unsplash.com/photos/random?client_id=" + authKey + "&query=water";
	var queryURLtwo = "https://api.unsplash.com/photos/random?client_id=" + authKey;
	var newURL = queryURLtwo + "&query=" + queryTerm;

   
	$.ajax({
	  url: newURL,
	  method: "GET"
	}).then(function(picture){
	  //get first search data from api 
	 
	  //console.log(picture);
	  
	  //console.log(picture.urls.small);
	  // apply img to app

	  var newImage = $("<img>")

	  var selectedImg = picture.urls.small
	  newImage.attr("src", selectedImg)
	
	  $("#image-base").append(newImage)

	  //console.log()
	  
	  
	  
	  
	
	})
	
  


   //return false;

})

// create call to unsplash

//Create array to store kanji searches and display them on the screen as clickable elements
var savedKanjiArr = JSON.parse(localStorage.getItem("saved-kanji")) || [];

//on page load, if there is any saved history, make search history buttons
for (var i=0; i<savedKanjiArr.length; i++) {
	var buttonEl = $("<button>");
	$(buttonEl).text(savedKanjiArr[i]);
	$(buttonEl).addClass("saved-search-button");
	$("#search-history").prepend(buttonEl);
}

function saveKanji (savedKanji) {
	//if the search is not already in the saved kanji array...
	if (!savedKanjiArr.includes(savedKanji)) {
		//push saved kanji into array
		savedKanjiArr.push(savedKanji);

		//display the kanji into the #search-history box
		var buttonElToo = $("<button>");
		$(buttonElToo).text(savedKanji);
		$(buttonElToo).addClass("saved-search-button");
		$("#search-history").prepend(buttonElToo);

		//add saved kanji searches into local storage
		localStorage.setItem("saved-kanji", JSON.stringify(savedKanjiArr));
	}
};

































































