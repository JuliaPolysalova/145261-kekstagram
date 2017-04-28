'use strict';

(function () {

    var picturesContainer = document.querySelector('.pictures');
    var picturesContainerAll = null;
    var dataFilters = document.querySelector('.filters');

    /*function addPhotos(containerElement, photoDataArray) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < photoDataArray.length; i++) {
            var photoElement = picture.createPhotoElement(photoDataArray[i]);
            fragment.appendChild(photoElement);
        }

        containerElement.appendChild(fragment);
    }*/

    function debounce(fun, args) {
      var lastTimeout;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, 400, args);
    }

    function getShuffledArray (array) {
      return array.sort(function () {
        return 0.5 - Math.random();
      });
    }

    function drawPhotos(photoDataArray) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < photoDataArray.length; i++) {
            fragment.appendChild(picture.createPhotoElement(photoDataArray[i]));
        }

        picturesContainer.appendChild(fragment);
        picturesContainerAll = document.querySelectorAll('.picture');
        initEventListenersForPhotos(photoDataArray);
    }

    function init (photoDataArray) {
        dataFilters.classList.remove('hidden');
        preview.openPicture(photoDataArray[0]);
        drawPhotos(photoDataArray);

        dataFilters.addEventListener('change', function(evt) {
            var newArray = [];
            if (evt.target.nodeName.toLowerCase() === 'input') {
                switch (evt.target.value) {
                    case 'new':
                        newArray = getShuffledArray(photoDataArray.slice()).slice(0, 10);
                        break;
                    case 'discussed':
                        newArray = photoDataArray.slice().sort(function (a, b) {
                            return b.comments.length - a.comments.length;
                        });
                        break;
                    default:
                        newArray = photoDataArray;
                    }
            }
            picturesContainer.innerHTML = '';
            debounce(drawPhotos(newArray));
        });
    }

    function getUniqueClickListener(photoData) {
        return function (evt) {
            evt.preventDefault();
            preview.openPicture(photoData);
        }
    }

    function errorHandler(errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    }

    function initEventListenersForPhotos(photoObjectsData) {
        //При нажатии на любой из элементов .picture должен показываться элемент .gallery-overlay с подробным описанием картинки
        for (var i = 0; i < picturesContainerAll.length; i++) {
            picturesContainerAll[i].addEventListener('click', getUniqueClickListener(photoObjectsData[i]));
        }
    }

    window.load(init, errorHandler);
    
})();