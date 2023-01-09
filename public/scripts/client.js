/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

//document.ready function to allow page to load and escape funtion to avoid 
//unsafe characters and convert into a safe "encoded" representation
$(document).ready(function() {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

//takes in createTweetElemnt function to post submitted tweet at the top of tweets
const renderTweets = function(data) {   
  $('#tweets-container').empty();                                                                               
  for (let tweet of data) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);    
  }
};

//takes in data object and creates html of tweet box, styled in pastTweets.css
const createTweetElement = function(data) {
  let $tweet = $(`
  <article class="past-tweets">
   <h5 class="tweet-header">
     <span class="tweet-header-left">
      <img src="${data.user.avatars}" alt="User Avatar"> &nbsp;&nbsp;
      <p>${data.user.name}</p>
     </span>
     <span>
     <p class="handle">${data.user.handle}</p>
     </span>
   </h5>
     <div>
     <section class="tweet-content">
     <p>${escape(data.content.text)}</p>
     </div>
   </section>
   <footer name="footer" class="footer" for="tweet-text">
     <span> ${timeago.format(data.created_at)} </span>
        <span>
          <i id="flag" class="fa-solid fa-flag"></i>&nbsp;&nbsp;&nbsp;
          <i id="rotate-arrows" class="fa-solid fa-arrows-rotate"></i>&nbsp;&nbsp;&nbsp;
          <i id="heart" class="fa-solid fa-heart"></i>          
        </span>
  </footer>
 </article>`);
return $tweet;
}
//calls renderTweets, creating final tweet with data and createTweetElement
renderTweets(data);

//function gets past tweets and displays them with ajax without having to refresh the page
const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then((tweets) => {
      console.log("your page is grabbing the tweets from database");
      renderTweets(tweets);
    })
    .catch((err) => {
      console.log("There was an ERROR ", err);
    });
};
//calls function
loadTweets();

//event listner listens to submit event and prevents default form submission of sending post request 
//and having to reload page (ajax). Loads tweet without reloading page, returns errors if no text input and
//text is over 140char.
$('.form-inline').submit(function(event) { 
  event.preventDefault();
  const data = $( this ).serialize();
  const $text = $("#tweet-text").val()
  if ($text === "") {
    $(".error").text("Oops!, you have to write something!!")
    $(".error").slideDown("slow").delay(2200).slideUp("slow");
  } else if ($text.length > 140) {
    $(".error").text("Oops! your tweet must be 140 characters maximum");
    $(".error").slideDown("slow").delay(2200).slideUp("slow");
  } else {
    $.ajax({
      url: "/tweets",
      method: "POST",
      data
    })
    .then(() => {
      loadTweets()
     })
     //empties form once tweet is submitted
     $(".form-inline").trigger("reset");
  }
});

})










//Female: ["https://i.imgur.com/nlhLi3I.png","https://i.imgur.com/z5LNkkB.png","https://i.imgur.com/v0JXau2.png","https://i.imgur.com/lRUnDgU.png", "https://i.imgur.com/3GvwNBf.png"],
//Male: ["https://i.imgur.com/73hZDYK.png","https://i.imgur.com/5fUVPRP.png","https://i.imgur.com/DVpDmdR.png","https://i.imgur.com/2WZtOD6.png", "https://i.imgur.com/ilT4JDe.png"]