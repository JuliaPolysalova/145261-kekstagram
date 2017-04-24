'use strict';

(function () {
    var NUMBER_PHOTOS = 25;

    function getPhotosObjects(photosNumber) {
        var commentsArray = [
            'Всё отлично!',
            'В целом всё неплохо. Но не всё.',
            'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
            'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
            'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
            'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
        ];

        var photoArray = [];

        for (var i = 0; i < photosNumber; i++) {
            var randomLikes = Math.ceil(Math.random() * (200 - 15) + 15);

            photoArray[i] = {};
            photoArray[i].url = 'photos/' + (i + 1) + '.jpg';
            photoArray[i].likes = randomLikes;
            photoArray[i].comments = commentsArray.filter(function () {
                return Math.random() >= 0.5;
            });
        }

        return photoArray;
    }

    function createPhotoElement(photoData) {
        var photoElement = pictureTemplate.cloneNode(true);

        photoElement.querySelector('img').src = photoData.url;
        photoElement.querySelector('.picture-comments').textContent = photoData.comments.length;
        photoElement.querySelector('.picture-likes').textContent = photoData.likes;

        return photoElement;
    }

    function addPhotos(containerElement, photoDataArray) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < photoDataArray.length; i++) {
            var photoElement = createPhotoElement(photoDataArray[i]);
            fragment.appendChild(photoElement);
        }

        containerElement.appendChild(fragment);
    }

    function getUniqueClickListener(photoData) {
        return function (evt) {
            evt.preventDefault();
            openPicture(photoData);
        }
    }

    function initEventListenersForPhotos(photoObjectsData) {
        //При нажатии на любой из элементов .picture должен показываться элемент .gallery-overlay с подробным описанием картинки
        for (var i = 0; i < picturesContainerAll.length; i++) {
            picturesContainerAll[i].addEventListener('click', getUniqueClickListener(photoObjectsData[i]));
        }
    }

    function onEscPressUpload(evt) {
        if (window.isEscape(evt)) {
            hideUploadOverlay();
        }
    }

    function showUploadOverlay(evt) {
        uploadOverlay.classList.remove('invisible'); //открытие ф. кадрирования
        document.addEventListener('keydown', onEscPressUpload);
    }

    function init() {
        var photosObjectData = getPhotosObjects(NUMBER_PHOTOS);
        hideUploadOverlay();
        addPhotos(picturesContainer, photosObjectData);
        openPicture(photosObjectData[0]);

        picturesContainerAll = document.querySelectorAll('.picture');
        initEventListenersForPhotos(photosObjectData);

        document.getElementById('upload-file').addEventListener('change', showUploadOverlay);
    }

    init();
})();