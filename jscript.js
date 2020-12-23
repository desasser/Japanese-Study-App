
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

$.ajax(settings).done(function (response) {
	console.log(response);



});











































//TODO:create call to unsplash


//TODO: variables ???

var authKey = "Uc5pwx1S972kG1H6z2IAy-29aDh3dWeqJpNz9UCF2v8";

// var queryTerm = ""

var queryURL = "https://api.unsplash.com/photos/random?client_id=" + authKey + "&query=water";

//TODO: create functions
//var numResults =""

//function runQuery(numResults, queryURL){
  

  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(picture){
      //TODO: get first search data from api 
     
      console.log(picture);
      
      console.log(picture.urls.small);
      
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