'use strict';

angular.module('wolfhound.directives')

.directive('gallery', function ($location, $compile, $document) {
  return {
    restrict: 'A',
    link: function (scope, elem, attr){

      // local variables
      var images = document.getElementsByTagName('img');
      var galleryItems = [];
      var keymap = _.clone(window.constants.keymap || {});

      //get a list of all images, and add ngClick directive to each
      for(var i = 0; i < images.length; i++) {

        var galleryObject = {
          title: images[i].getAttribute('alt'),
          description: images[i].getAttribute('longdesc'),
          image: images[i].getAttribute('image')
        }

        galleryItems.push(galleryObject);

        angular.element(images[i]).attr({
          "ng-click":"openGalleryItem("+i+")",
          "ng-keypress":"openGalleryItem("+i+")",
          "tabindex": 0
        }).addClass("cursor gallery-item");

        $compile(images[i])(scope);
      }

      /* local private functions */

      // get previous image in object
      function getPrevImage(currentId) {
        if(currentId === 0){ return galleryItems.length - 1; }
        else { return currentId-1; }
      }

      // get next image in object
      function getNextImage(currentId) {
        if(currentId + 1 === galleryItems.length){ return 0; }
        else { return currentId+1; }
      }

      /*scope variables*/

      scope.showGallery = false;
      scope.galleryTitle = '';
      scope.galleryDescription = '';
      scope.galleryImage = '';
      scope.galleryImageNum = galleryItems.length;

      /*scope functions*/

      // when actioned, gets id from param and sets all the
      // required scope variable
      scope.openGalleryItem = function (id) {

        scope.galleryTitle = galleryItems[id].title;
        scope.galleryDescription = galleryItems[id].description;
        scope.galleryImage = galleryItems[id].image;
        scope.currentGalleryImage = id;
        scope.currentGalleryImageLabel = id + 1;
        scope.prevGalleryImage = getPrevImage(id);
        scope.nextGalleryImage = getNextImage(id);
        scope.showGallery = true;

      }

      // close gallery and reset scope variables
      scope.closeGallery = function () {

        scope.showGallery = false;
        scope.galleryTitle = '';
        scope.galleryDescription = '';
        scope.galleryImage = '';

      }

      // keyboard binding
      $document.bind('keypress keydown', function(event) {

        // if the gallery is shown, prevent normal keyboard actions and replace with the following;
        if(scope.showGallery){
          event.preventDefault();

          // if arrow left or down pressed, get previous image
          if(event.which === keymap.left || event.which === keymap.down) {
            scope.openGalleryItem(getPrevImage(scope.currentGalleryImage));
          }

          // if arrow right or up pressed, get next image
          if(event.which === keymap.right || event.which === keymap.up) {
            scope.openGalleryItem(getNextImage(scope.currentGalleryImage));
          }

          // if escape button pressed, closed gallery
          if(event.which === keymap.esc) {
            scope.closeGallery();
          }

        }

        // apply to scope
        scope.$apply();
      });
    }
  }
})
