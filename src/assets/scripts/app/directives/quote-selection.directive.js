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

        var tweetWrapper = function (tweetText) {
          var tweet;

          if(tweetText.length > 128){
            tweet = "\"" + tweetText.substring(0, 128) + "...\" @_hmck";
          } else {
            tweet = "\"" + tweetText + "\" @_hmck";
          }
          return tweet;
        }

        var positionTooltip = function (tooltip) {

          // top position (or bottom if too close to top)
          if(tooltip.top < 60){
            scope.toolTipTop = ($window.pageYOffset + tooltip.bottom)+'px' ;
            scope.toolTipArrow = 'top';
          } else {
            scope.toolTipTop = ($window.pageYOffset + (tooltip.top - 60))+'px';
            scope.toolTipArrow = 'bottom';
          }

          // left position (or relative to right
          scope.toolTipLeft = (tooltip.left + ((tooltip.width/2) - 50))+'px';
        }


        elem.on('mouseup', function() {

          var selection = $window.getSelection(),
          range = selection.getRangeAt(0),
          tooltip = range.getBoundingClientRect(),
          tweetText = selection.toString();

          if(tweetText.length === 0){

            scope.tweet = defaultValue;
            scope.showTooltip = false;

          } else {

            scope.showTooltip = true;

            if(scope.showTooltip) positionTooltip(tooltip);

            scope.tweet = tweetWrapper(tweetText);
            scope.tweetLength = scope.tweet.length;

          }
          scope.$apply();
        });

        scope.sendQuote = function() {

          var encodedTweet = encodeURI(scope.tweet);
          $window.open('https://twitter.com/intent/tweet?text='+encodedTweet, '', 'width=500,height=400');

        }

      }
    };
  });
