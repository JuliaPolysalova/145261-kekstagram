'use strict';

(function () {

    var picturesContainer = document.querySelector('.pictures');
    var picturesContainerAll = null;


    /*function addPhotos(containerElement, photoDataArray) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < photoDataArray.length; i++) {
            var photoElement = picture.createPhotoElement(photoDataArray[i]);
            fragment.appendChild(photoElement);
        }

        containerElement.appendChild(fragment);
    }*/

    window.load(function (photoDataArray) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < photoDataArray.length; i++) {
            fragment.appendChild(picture.createPhotoElement(photoDataArray[i]));
        }
        picturesContainer.appendChild(fragment);

        //userDialog.querySelector('.setup-similar').classList.remove('hidden');
    });

    function getUniqueClickListener(photoData) {
        return function (evt) {
            debugger;
            evt.preventDefault();
            preview.openPicture(photoData);
            debugger;
        }
    }

    function initEventListenersForPhotos(photoObjectsData) {
        //При нажатии на любой из элементов .picture должен показываться элемент .gallery-overlay с подробным описанием картинки
        for (var i = 0; i < picturesContainerAll.length; i++) {
            picturesContainerAll[i].addEventListener('click', getUniqueClickListener(photoObjectsData[i]));
        }
    }

    function init() {
        var photosObjectData = data.getData();
        //addPhotos(picturesContainer, photosObjectData);
        preview.openPicture(photosObjectData[0]);

        picturesContainerAll = document.querySelectorAll('.picture');
        initEventListenersForPhotos(photosObjectData);

    }

    init();
})();