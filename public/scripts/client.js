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
  
$(document).ready(function(){

const renderTweets = function(data) {                                                                                  
  for (let tweet of data) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);    
  }
};

const createTweetElement = function(data) {
  let $tweet = $(`
  <article class="past-tweets">
   <h5 class="tweet-header">
     <span class="tweet-header-left">
      <img src="${data.user.avatars}"> &nbsp;&nbsp;
      <p>${data.user.name}</p>
     </span>
     <span>
     <p class="handle">${data.user.handle}</p>
     </span>
   </h5>
     <span>
     <section class="tweet-content">
     <p>${data.content.text}</p>
     </span>
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
renderTweets(data);

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

loadTweets();


$('.form-inline').submit(function(event) { 
  event.preventDefault();
  alert( "Handler for .submit() called." );
  const data = $( this ).serialize();
  $.post('/tweets', data);
});

})










//Female: ["https://i.imgur.com/nlhLi3I.png","https://i.imgur.com/z5LNkkB.png","https://i.imgur.com/v0JXau2.png","https://i.imgur.com/lRUnDgU.png", "https://i.imgur.com/3GvwNBf.png"],
//Male: ["https://i.imgur.com/73hZDYK.png","https://i.imgur.com/5fUVPRP.png","https://i.imgur.com/DVpDmdR.png","https://i.imgur.com/2WZtOD6.png", "https://i.imgur.com/ilT4JDe.png"]