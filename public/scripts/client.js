/**
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 * Prevent code from being executed from tweet input
 * @param {string} str
 * @returns safe string
 */

const escapeCode = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * Function createTweetElement()
 *
 * @param object
 * @returns markup for a single tweet article
 */

const createTweetElement = function(object) {
  const $tweet = `
  <article class="tweet">
    <header>
      <img with="64" height="64" src="${object["user"]["avatars"]}" class="tweet-pic" alt="Author Profile Picture">
      <span class="tweet-author">${object["user"]["name"]}</span>
      <span class="tweet-handle"><a href="">${object["user"]["handle"]}</a></span>
    </header>
    <div class="tweet-content">
      <p>${escapeCode(object["content"]["text"])}</p>
    </div>
    <footer>
        <time>${timeago.format(object["created_at"])}</time>
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
    </article>
  `;

  return $tweet;
};

/**
 * Function calls after document is ready
 */
$(document).ready(function() {

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
   * renderNewTweets
   *
   * Loop through array of user objects and return the last one
   * @param array tweets
   */

  const renderNewTweet = function(tweets) {
    const container = $('#tweets-container');
    const tweet = tweets[tweets.length - 1];

    // Add the tweet to the top of the list
    container.prepend(createTweetElement(tweet));
  };

  /**
   * Load Tweets loadTweets()
   *
   */

  const loadTweets = function(callback) {
    $.getJSON('/tweets', function(data) {
      callback(data);
    });
  };

  loadTweets(renderTweets);

  /**
   * Post New Tweets from using AJAX
   *
   */

  const postNewTweet = function() {
    $('#new-tweet').submit(function(e) {

      // Prevent form from submitting and reloading the page
      e.preventDefault();

      // Create an object to store the form data
      const formDataObj = {};
      formDataObj["text"] = $(this).find('textarea').val();

      // Write to errors div
      let message = '';
      let textareaElem = $(this).find('textarea');
      let errorElem = $(this).find('.errors');
      errorElem.text('').hide();


      if (!formDataObj["text"]) {
        message = `<div>You cannot post an empty tweet!</div>`;
        errorElem.append(message).slideDown();
        return;
      }

      if (formDataObj["text"].length > 140) {
        message = "<div>You cannot post a tweet longer than 140 characters</div>";
        errorElem.append(message).slideDown();
        return;
      }

      // Serialize the form data
      let data = $(this).serialize();

      $.post('/tweets/', data, function(data) {
        loadTweets(renderNewTweet);
      })
      .fail(function() {
        console.log("Error!");
        message = "<div>Darn, your post was not saved. Let's try that again.</div>";
        errorElem.append(message).slideDown();
        return;
      })
      .done(function() {
        console.log("Success!");

        // Clear the textarea on successful post
        textareaElem.delay('200').val('');
      });
    });
  };

  postNewTweet();

  /**
   * Function addScrollToClass()
   *
   * @returns adds class to back to top button on scroll
   */

  const addScrollToClass = function(element) {
    $(window).on('scroll', function() {
      let windowTopOffset = Number($(this).scrollTop());

      if (windowTopOffset < 200) {
        element.removeClass('on-scroll');
      } else {
        element.addClass('on-scroll');
      }
    });
  };

  addScrollToClass($('.nav-primary'));
  addScrollToClass($('.back-to-top'));

  /**
   * Function showTweetForm()
   *
   * @returns reveals the tweet form on nav button click
   */

  const showTweetForm = function(element) {
    const newTweetElem = $('#section-new-tweet');
    newTweetElem.find('#new-tweet').hide();

    element.on('click', function(e) {
      e.preventDefault();
      
      const newTweetPosition = newTweetElem.position();

      $('body, html').animate({
        scrollTop: newTweetPosition.top - 120
      }, 400, 'swing', function() {
        newTweetElem.find('#new-tweet').slideDown();
      });
    });
  };

  showTweetForm($('.nav-new-tweet a'));
  showTweetForm($('.back-to-top'));

});
