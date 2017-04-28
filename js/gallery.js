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



    function getUniqueClickListener(photoData) {
        debugger;
        return function (evt) {
            evt.preventDefault();
            preview.openPicture(photoData);
        }
    }

    function initEventListenersForPhotos(photoObjectsData) {
        //debugger;
        //При нажатии на любой из элементов .picture должен показываться элемент .gallery-overlay с подробным описанием картинки
        for (var i = 0; i < picturesContainerAll.length; i++) {
            picturesContainerAll[i].addEventListener('click', getUniqueClickListener(photoObjectsData[i]));
        }
    }

    var loadHandler = function (photoDataArray) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < photoDataArray.length; i++) {
            fragment.appendChild(picture.createPhotoElement(photoDataArray[i]));
        }
        picturesContainer.appendChild(fragment);
    };

    var errorHandler = function (errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    }

    function init() {
        var photosObjectData = data.getData();
        //addPhotos(picturesContainer, photosObjectData);
        preview.openPicture(photosObjectData[0]);
        picturesContainerAll = document.querySelectorAll('.picture');

        window.load(loadHandler, errorHandler);

        initEventListenersForPhotos(photosObjectData);
    }

    init();
})();
/*'use strict';

 (function () {

 var picturesContainer = document.querySelector('.pictures');
 var picturesContainerAll = null;

 function addPhotos(containerElement, photoDataArray) {
 var fragment = document.createDocumentFragment();

 for (var i = 0; i < photoDataArray.length; i++) {
 var photoElement = picture.createPhotoElement(photoDataArray[i]);
 fragment.appendChild(photoElement);
 }

 containerElement.appendChild(fragment);
 }

 function getUniqueClickListener(photoData) {
 return function (evt) {
 evt.preventDefault();
 preview.openPicture(photoData);
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
 addPhotos(picturesContainer, photosObjectData);
 preview.openPicture(photosObjectData[0]);

 picturesContainerAll = document.querySelectorAll('.picture');
 initEventListenersForPhotos(photosObjectData);

 }

 init();
 })()*/