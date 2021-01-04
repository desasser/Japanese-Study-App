
//Activates the Burger 

$(document).ready(function () {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
    

  })
});

//On click event of the title back to home page 

$(document).ready(function () {

  $("#game-title").click(function () {
    // window.location = $("#game-title").data("location");
    window.location.href="#home";
  });
});




