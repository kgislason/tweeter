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
    container.append(createTweetElement(tweets[tweet]));
  }
};

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
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
];

/**
 * Function calls after document is ready
 */
$(document).ready(function() {
  renderTweets(data);
});
