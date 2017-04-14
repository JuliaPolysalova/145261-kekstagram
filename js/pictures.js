'use strict';

var NUMBER_PHOTOS = 25;
var galleryOverlay = document.querySelector('.gallery-overlay');
var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;


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


function showOverlay(photoData) {
    galleryOverlay.classList.remove('invisible');
    galleryOverlay.querySelector('.gallery-overlay-image').src = photoData.url;
    galleryOverlay.querySelector('.likes-count').textContent = photoData.likes;
    galleryOverlay.querySelector('.comments-count').textContent = photoData.comments.length;
}


function init() {
    var photosObjectData = getPhotosObjects(NUMBER_PHOTOS);
    document.querySelector('.upload-overlay').classList.add('invisible');
    addPhotos(picturesContainer, photosObjectData);
    showOverlay(photosObjectData[0]);
}

init();

//task2
var picturesContainerAll = document.querySelectorAll('.pictures');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

function onEscPress(evt) {
    if (evt.keyCode === 27) {
        closePicture();
        }
}

//picturesContainerAll.forEach(function(x) {return x;});

function openPicture() {
    galleryOverlay.classList.remove('invisible');
    document.addEventListener('keydown', onEscPress);
}

function closePicture() {
    galleryOverlay.classList.add('invisible');
    document.removeEventListener('keydown', onEscPress);
}

//При нажатии на любой из элементов .picture должен показываться элемент .gallery-overlay с подробным описанием картинки
for (var i = 0; i < picturesContainerAll.length; i++)
    picturesContainerAll[i].addEventListener('click', function(){
    openPicture();
});

//При нажатии на элемент .gallery-overlay-close элемент .gallery-overlay должен скрываться
galleryOverlayClose.addEventListener('click', function(){
    closePicture();
});

var ENTER_KEY_CODE = 13;

function isActivationEvent(evt) {
    return evt.keyCode === ENTER_KEY_CODE;
}

for (var i = 0; i < picturesContainerAll.length; i++)
    picturesContainerAll[i].addEventListener('keydown', function(evt) {
    if (isActivationEvent(evt)) {
        openPicture();
    }
});

galleryOverlayClose.addEventListener('keydown', function(evt) {
    if (isActivationEvent(evt)){
        closePicture();
    };
});

//При изменении значения поля загрузки фотографии #upload-file в форме #upload-select-image, показывается форма кадрирования изображения, а форма загрузки скрывается
var uploadOverlay = document.querySelector('.upload-overlay');
uploadOverlay.classList.add('invisible');

var uploadForm = document.querySelector('#upload-select-image');
uploadForm.classList.remove('invisible');

var uploadFormCancel = document.querySelector('.upload-form-cancel');
uploadFormCancel.addEventListener('click', function () {
    uploadOverlay.classList.remove('invisible');
    uploadForm.classList.add('invisible');
})
