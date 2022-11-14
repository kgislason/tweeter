/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 * Function createTweetElement()
 *
 * @param object
 * @returns markup for a single tweet article
 */

const createTweetElement = function(object) {
  const $tweet = $(`<article class="tweet"></article>`);

  $tweet.prepend(`
  <header>
    <img with="64" height="64" src="${object["user"]["avatars"]}" class="tweet-pic" alt="Author Profile Picture">
    <span class="tweet-author">${object["user"]["name"]}</span>
    <span class="tweet-handle"><a href="">${object["user"]["handle"]}</a></span>
  </header>
  <div class="tweet-content">
    <p>${object["content"]["text"]}</p>
  </div>
  <footer>
      <time>${object["created_at"]} ago</time>
      <nav class="tweet-actions">
        <button type="button" class="btn flag">
          <span class="sr-only">Flag this tweet</span>
          <i class="fa-solid fa-flag"></i>
        </button>
        <button type="button" class="retweet">
          <span class="sr-only">Retweet this tweet</span>
          <i class="fa-solid fa-retweet"></i>
        </button>
        <button type="button" class="like">
          <span class="sr-only">Like this tweet</span>
          <i class="fa-solid fa-heart"></i>
        </button>
      </nav>
    </footer>
  `);

  return $tweet;
};

/**
 * renderTweets
 *
 * Loop through array of user objects
 * @param array tweets
 */

const renderTweets = function(tweets) {
  const container = $('#tweets-container');
  for (let tweet in tweets) {
    container.prepend(createTweetElement(tweets[tweet]));
  }
};

/**
 * Function calls after document is ready
 */
$(document).ready(function() {
  // renderTweets(data);
  const loadTweets = function() {
    $.getJSON('/tweets', function( data ) {
      console.log(data)
      renderTweets(data);
    });
  };

  loadTweets();

  /**
   * Post New Tweets from using AJAX
   */
  const postNewTweet = function() {
    $('#new-tweet').submit(function(e) {
      // Prevent form from submitting and reloading the page
      e.preventDefault();

      // Serialize the form data
      let data = $(this).serialize();

      // Clear the textarea
      $(this).find('textarea').val('');
      $.post('/tweets/', data, function(data) {        
        console.log(data);
        loadTweets(data);
      }).done(function(data) {
        console.log("Success!");
      });
    });
  }
  postNewTweet();

  
});
