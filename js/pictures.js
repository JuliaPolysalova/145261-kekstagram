'use strict';

(function () {
    var picturesContainer = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture-template').content;

    var picturesContainerAll = null;
    var galleryOverlay = document.querySelector('.gallery-overlay');
    var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

    function onEscPress(evt) {
        if (window.isEscape(evt)) {
            closePicture();
        }
    }

    function openPicture(pictureData) {
        document.addEventListener('keydown', onEscPress);

        galleryOverlay.querySelector('.gallery-overlay-image').src = pictureData.url;
        galleryOverlay.querySelector('.likes-count').textContent = pictureData.likes;
        galleryOverlay.querySelector('.comments-count').textContent = pictureData.comments.length;
        galleryOverlay.classList.remove('invisible');
    }

    function closePicture() {
        galleryOverlay.classList.add('invisible');
        document.removeEventListener('keydown', onEscPress);
    }

//При нажатии на элемент .gallery-overlay-close элемент .gallery-overlay должен скрываться
    galleryOverlayClose.addEventListener('click', function(){
        closePicture();
    });

    galleryOverlayClose.addEventListener('keydown', function(evt) {
        if (window.isEnter(evt)){
            closePicture();
        };
    });

})();
