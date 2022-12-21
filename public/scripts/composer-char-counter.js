$(document).ready(function() {
  $('#tweet-text').on("keypress", function(event) {
    
    //find the length of the input using jQuery
    const chars = $(this).val().length;
    
    //locate the counter in the index html
    const charCounter = $(this).parent().children('.tweet-button').children('.counter');

    //set the countdown
    const remChar = 139 - chars;

    //turn the numbers red if they go below zero
    charCounter.val(remChar)
    if (remChar <= 0) {
      charCounter.css('color', '#e73b08')
    };
  });
});
