$(document).ready(function() {
  // --- our code goes here ---
  console.log("Ready!");

  // Start our tweent counter
  let count = 0;

  const tweetCounter = function() {
    // console logging the number of characters left.
    if (count < 141) {
      console.log("Tweent Count: ", count);
      $('.counter').removeClass('text-red');
      return count;
    }
    // if the textarea has more than 140 characters it should be logging negative values.
    if (count > 140) {
      let negativeCount = -(count - 140);
      console.log("Tweent Count: ", negativeCount);
      $('.counter').addClass('text-red');
      return negativeCount;
    }
  };

  $('.new-tweet textarea').on('input', function() {
    // Get the count from the value of textarea (this)
    count = $(this).val().length;
    tweetCounter();

    $('.counter').text(tweetCounter());
  });

});