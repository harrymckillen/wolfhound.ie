'use strict';

angular.module('wolfhound.directives')

.directive('quoteSelection', function ($window) {
    return {
      restrict: 'A',
      scope: false,
      link: function (scope, elem) {

        // local variables
        var defaultValue = 'Nothing selected';

        //scope variables
        scope.tweet = defaultValue;

        // basic wrapper for the tweet text
        var tweetWrapper = function (tweetText) {
          var tweet;

          if(tweetText.length > 128){
            tweet = "\"" + tweetText.substring(0, 128) + "...\" @_hmck";
          } else {
            tweet = "\"" + tweetText + "\" @_hmck";
          }
          return tweet;
        }

        // position tooltip function
        var positionTooltip = function (tooltip) {

          // top position (or bottom if too close to top)
          if(tooltip.top < 60){
            scope.toolTipTop = ($window.pageYOffset + tooltip.bottom)+'px' ;
            scope.toolTipArrow = 'top';
          }

          // else, the arrow is display by default at the bottom
          else {
            scope.toolTipTop = ($window.pageYOffset + (tooltip.top - 60))+'px';
            scope.toolTipArrow = 'bottom';
          }

          // left position (or relative to right)
          scope.toolTipLeft = (tooltip.left + ((tooltip.width/2) - 50))+'px';
        }

        // when the text is selected, and the mouse is released, it gets the selected text
        elem.on('mouseup', function() {

          var selection = $window.getSelection(),
          range = selection.getRangeAt(0),
          tooltip = range.getBoundingClientRect(),
          tweetText = selection.toString();

          // if tweet text length is 0
          if(tweetText.length === 0){

            // empty tweet
            scope.tweet = defaultValue;

            // set tooltip to hidden
            scope.showTooltip = false;

          } else {

            // else we have text selected, show tooltip
            scope.showTooltip = true;

            // if above value is true, call the position function
            if(scope.showTooltip) positionTooltip(tooltip);

            // wrap the selected text in the tweet wrapper
            scope.tweet = tweetWrapper(tweetText);

            // get the length of the tweet
            scope.tweetLength = scope.tweet.length;

          }
          scope.$apply();
        });

        // send quote function
        scope.sendQuote = function() {

          // URL encode the tweet text
          var encodedTweet = encodeURI(scope.tweet);

          // when actioned, send to twitter api
          $window.open('https://twitter.com/intent/tweet?text='+encodedTweet, '', 'width=500,height=400');

        }

      }
    };
  });
