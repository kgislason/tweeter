$(document).ready(function() {

  // Start our tweent counter on page load
  let count = 0;

  /**
   * tweetCounter()
   * 
   * @returns a number of characters remaining
   * a negative value means the user has gone over the max
   */

  const tweetCounter = function() {

    const maxChars = 140;

    // console logging the number of characters left.
    if (count <= maxChars) {
      let countReminaing = maxChars - count;
      $('.counter').removeClass('text-red');
      return countReminaing;
    }
    // if the textarea has more than 140 characters it should be logging negative values.
    if (count > maxChars) {
      let negativeCount = -(count - 140);
      $('.counter').addClass('text-red');
      return negativeCount;
    }
  };

  /**
   * countChars()
   * 
   * Listen for input from user
   * update the counter
   * Set the text below the textarea to the current remaining character count
   */

  const countChars = function() {
    $('.new-tweet textarea').on('input', function() {
      // Get the count from the value of textarea (this)
      count = $(this).val().length;
      tweetCounter();

      $('.counter').text(tweetCounter());
    });
  };

  countChars();


  $(document).ajaxSuccess(function() {

    /**
     * Reset Tweet Counter
     */

    const resetTweetCounter = function() {
      // Reset the global variable count
      count = 0;

      // Change the text back to zero
      $('.counter').text(tweetCounter());
    };

    resetTweetCounter();  

  });
});
