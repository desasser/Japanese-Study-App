
//TODO: create api call kanjilive.

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/?kem=parent",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "9df5add180mshd864f1707e5c655p1f0599jsn09d6675716fd",
		"x-rapidapi-host": "kanjialive-api.p.rapidapi.com"
	}
};

//Get a word from the input in english
//send that to the first AJAX call to retrieve a kanji
//Send that kanji to the second AJAX call to extract meta data about it

//This call is copied from the KanjiAlive Api, advanced search KEM/english meaning
//first AJAX call to retrieve kanji from meaning
$.ajax(settings).done(function (response) {
	console.log(response);
	var currentKanji = response[0].kanji.character;
	console.log(currentKanji);

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
	});

});











































//TODO:create call to unsplash


//TODO: variables ???

var authKey = "Uc5pwx1S972kG1H6z2IAy-29aDh3dWeqJpNz9UCF2v8";

// var queryTerm = ""

var queryURL = "https://api.unsplash.com/photos/random?client_id=" + authKey + "&query=water";

//TODO: create functions
//var numResults =""

//function runQuery(numResults, queryURL){
  
//ajax call to unsplash to get photo
  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(picture){
      //TODO: get first search data from api 
     
      console.log(picture);
      
      console.log(picture.urls.small);
	  //TODO: apply img to app
	  var selectedImg = picture.urls.small
	
	  $("#image-base").append(selectedImg)

      console.log()
      
      
      
      
    
    })
//}






















$("#searchBtn").on("click", function(event) {
	event.preventDefault()
  
  
	  queryTerm = $("#searchplz").val();
	  
	  console.log(queryTerm);
  
	  var newURL = queryURL + "&q=" + queryTerm;
  
	  console.log(newURL)
  
	  
	
  
  
	//  return false;
  
  })