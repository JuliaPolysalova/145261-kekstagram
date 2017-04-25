'use strict';

window.data = (function () {

    var NUMBER_PHOTOS = 25;

    function getPhotosObjects() {
        var commentsArray = [
            'Всё отлично!',
            'В целом всё неплохо. Но не всё.',
            'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
            'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
            'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
            'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
        ];

        var photoArray = [];

        for (var i = 0; i < NUMBER_PHOTOS; i++) {
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

    return {
        getData : getPhotosObjects
    }
})();   