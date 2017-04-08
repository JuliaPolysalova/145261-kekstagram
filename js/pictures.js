'use strict';

//1
var NUMBER_PHOTOS = 25;

function getPhotos(NUMBER_PHOTOS) {
    var photoArray = [];

    for (var i = 0; i < NUMBER_PHOTOS; i++) {
        var randomLikes = Math.ceil(Math.random() * (200 - 15) + 15);

        photoArray[i] = {};
        photoArray[i].url = 'photos/' + (i + 1) + '.jpg';
        photoArray[i].likes = randomLikes;
        photoArray[i].comments = randomComments;
    }

    return photoArray;
}


var commentsArray = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var randomComments = function () {
    return (commentsArray[Math.floor(Math.random() * commentsArray.length)]);
}

//2
var pictureTemplate = document.querySelector('#picture-template').content;
function createPhotoElement(photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('img').src = photoArray.url;
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;

    return photoElement;
}


//3
var pictures = document.querySelector('.pictures');
function addPhotos(element, photoArray) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photoArray.length; i++) {
        var photoElement = createPhotoElement(photo[i]);
        fragment.appendChild(photoElement);
    }

    element.appendChild(fragment);
}


//4
document.querySelector('.upload-overlay').classList.add('invisible');

//5
var galleryOverlay = document.querySelector('.gallery-overlay');

var showOverlay = function() {
    galleryOverlay.classList.remove('invisible');
    galleryOverlay.querySelector('.gallery-overlay-image').src = photoArray.url;
    galleryOverlay.querySelector('.likes-count').textContent = photoArray.likes;
    galleryOverlay.querySelector('.comments-count').textContent = photoArray.comments.length;
};
