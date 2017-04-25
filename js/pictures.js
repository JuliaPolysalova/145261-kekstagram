'use strict';

window.picture = (function () {
    
    var pictureTemplate = document.querySelector('#picture-template').content;
    
    function createPhotoElement(photoData) {
        var photoElement = pictureTemplate.cloneNode(true);

        photoElement.querySelector('img').src = photoData.url;
        photoElement.querySelector('.picture-comments').textContent = photoData.comments.length;
        photoElement.querySelector('.picture-likes').textContent = photoData.likes;

        return photoElement;
    }

    return {
        createPhotoElement : createPhotoElement
    }

})();
