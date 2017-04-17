'use strict';

var NUMBER_PHOTOS = 25;
var galleryOverlay = document.querySelector('.gallery-overlay');
var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;
var uploadOverlay = document.querySelector('.upload-overlay');

var picturesContainerAll = null;
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

var uploadForm = document.querySelector('#upload-select-image'); ///BBEPX
var uploadFormCancel = document.querySelector('.upload-form-cancel'); //BBEPX
var uploadFormSubmit = document.querySelector('.upload-form-submit'); //вверх
var uploadFormDescription = document.querySelector('.upload-form-description'); //BBEPX

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
        photoArray[i].comments = commentsArray.filter(function() {
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
    return function(evt) {
        evt.preventDefault();
        openPicture(photoData);
    }
}

function initEventListenersForPhotos (photoObjectsData) {
    //При нажатии на любой из элементов .picture должен показываться элемент .gallery-overlay с подробным описанием картинки
    for (var i = 0; i < picturesContainerAll.length; i++) {
        picturesContainerAll[i].addEventListener('click', getUniqueClickListener(photoObjectsData[i]) );
    }
}

function hideUploadOverlay(evt) {
    uploadOverlay.classList.add('invisible'); //закрытие формы кадрирования
}

function showUploadOverlay(evt) {
    uploadOverlay.classList.remove('invisible'); //открытие ф. кадрирования
    document.addEventListener('keydown', onEscPressUpload);
}

function onEscPressUpload(evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
        hideUploadOverlay();
    }
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

//task2
function onEscPress(evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
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

function isActivationEvent(evt) {
    return evt.keyCode === ENTER_KEY_CODE;
}

galleryOverlayClose.addEventListener('keydown', function(evt) {
    if (isActivationEvent(evt)){
        closePicture();
    };
});

uploadForm.classList.remove('invisible');

uploadFormCancel.addEventListener('click', function() {
    hideUploadOverlay();
});
uploadFormCancel.addEventListener('keydown', function(evt) {
    if (isActivationEvent(evt)){
        hideUploadOverlay();
    };
});


uploadFormSubmit.addEventListener('click', function() {
    hideUploadOverlay();
})

uploadFormSubmit.addEventListener('keydown', function(evt) {
    if (isActivationEvent(evt)){
        hideUploadOverlay();
    };
});

uploadFormDescription.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
        evt.stopPropagation();
    }
});
