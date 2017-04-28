'use srtict';

(function () {
    var filterForm = document.querySelector('.upload-filter');
    var filterFormMinusBtn = filterForm.querySelector('.upload-resize-controls-button-dec');
    var filterFormPlusBtn = filterForm.querySelector('.upload-resize-controls-button-inc');
    var filterFormPreview = filterForm.querySelector('.filter-image-preview');
    var filterFormResizeInput = filterForm.querySelector('input[type="text"]');
    var filterControls = document.querySelector('.upload-filter-controls');
    var uploadImgForm = document.querySelector('.upload-image');
    var uploadOverlay = document.querySelector('.upload-overlay');

    var uploadForm = document.querySelector('#upload-select-image');
    var uploadFormCancel = document.querySelector('.upload-form-cancel');
    var uploadFormSubmit = document.querySelector('.upload-form-submit');
    var uploadFormDescription = document.querySelector('.upload-form-description');

    var MAX_RESIZE = '100%';
    var MIN_RESIZE = '25%';
    var STEP_RESIZE = '25%';
    var ESCAPE_KEY_CODE = 27;
    
    var currentFilterValue = 1;

    var filterLevel = document.querySelector('.upload-filter-level')
    var filterLevelLine = document.querySelector('.upload-filter-level-line');
    var filterLevelValue = document.querySelector('.upload-filter-level-val');
    var filterPinHandler = document.querySelector('.upload-filter-level-pin'); //находим что перетаскивать

    window.initializeScale(100, filterFormPlusBtn, filterFormMinusBtn, MAX_RESIZE, MIN_RESIZE, STEP_RESIZE, resizeFilteredImage);

    function resizeFilteredImage (sizeValue) {
        //var sizeValue = parseInt(filterFormResizeInput.value, 10);
        filterFormResizeInput.setAttribute('value', sizeValue + '%');
        filterFormPreview.style.transform = 'scale(' + sizeValue / 100 + ')';
    }

    function setSliderCoords (value) { // в пикселях
        filterPinHandler.style.left = value + 'px'; //коорд относит левого
        filterLevelValue.style.width = value + 'px';
    }

    function setSliderCoordsByPercent (value) { // 0..1
        var filterLevelCoords = filterLevelLine.getBoundingClientRect();
        var newValue = filterLevelCoords.width * value + 'px';

        filterPinHandler.style.left =  newValue;
        filterLevelValue.style.width = newValue;
    }

    filterPinHandler.addEventListener('mousedown', function (evt) { //обработка события mousedown
        evt.preventDefault();

        var startCoordX = evt.clientX;

        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();

            var currentCoordX = moveEvt.clientX;
            var shiftX = startCoordX - currentCoordX;

            if (shiftX === 0) return;

            var filterLevelCoordinates = filterLevelLine.getBoundingClientRect();

            if (currentCoordX > filterLevelCoordinates.right) {
                currentCoordX = filterLevelCoordinates.right;
            }

            if (currentCoordX < filterLevelCoordinates.left) {
                currentCoordX = filterLevelCoordinates.left;
            }

            var newCoord = currentCoordX-filterLevelCoordinates.left;
            setSliderCoords(newCoord);
            changeFilterLevel(newCoord / filterLevelCoordinates.width);
        };

        var onMouseUp = function (upEvt) {
            upEvt.preventDefault();
            filterLevel.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        filterLevel.addEventListener('mousemove', onMouseMove);  //передвижение мыши
        document.addEventListener('mouseup', onMouseUp); //отпускание мыши
    });

    function changeFilterLevel(value) {
        var currentFilter = filterForm.querySelector('input[type=radio]:checked');
        var filterName = currentFilter.value;
        var styleFilter = '';
        var unit = '';
        var level = 0;
        switch (filterName) {
            case 'chrome':
                level = value;
                styleFilter = 'grayscale';
                break;
            case 'sepia':
                level = value;
                styleFilter = 'sepia';
                break;
            case 'marvin':
                level = value * 100;
                styleFilter = 'invert';
                unit = '%';
                break;
            case 'phobos':
                level = value * 3;
                styleFilter = 'blur';
                unit = 'px';
                break;
            case 'heat':
                level = value * 3;
                styleFilter = 'brightness';
                break;
            default:
                styleFilter = 'none';
        }

        filterFormPreview.style.filter = styleFilter + (styleFilter === 'none' ? '' : '(' + level + unit + ')' );
    }

    window.initializeFilters(filterControls, function (currentFilter, evt) {
        currentFilterValue = 1;

        if(currentFilter.value == 'none') {
            filterLevel.classList.add('invisible');
            changeFilterLevel(1);
        } else {
            filterLevel.classList.remove('invisible');
            setSliderCoordsByPercent(1);
            changeFilterLevel(1);
        }
        console.log(currentFilter.value);
    });


    function isEscape(evt) {
        return evt.keyCode === ESCAPE_KEY_CODE;
    }

    function onEscPressUpload(evt) {
        if (evt.keyCode === ESCAPE_KEY_CODE) {
            hideUploadOverlay();
        }
    }

    function showUploadOverlay(evt) {
        uploadOverlay.classList.remove('invisible'); //открытие ф. кадрирования
        document.addEventListener('keydown', onEscPressUpload);
    }

    function clearFilterForm() {
        uploadImgForm.reset();
        filterForm.reset(); //что это??
        filterFormResizeInput.setAttribute('value', MAX_RESIZE);
        resizeFilteredImage(100);
        filterFormPreview.className = 'filter-image-preview';
        changeFilterLevel(1);
        filterLevel.classList.add('invisible');
    }

    function hideUploadOverlay(evt) {
        uploadOverlay.classList.add('invisible');
        clearFilterForm();
    }

    function init () {

        uploadForm.classList.remove('invisible');

        uploadFormCancel.addEventListener('click', function() {
            hideUploadOverlay();
        });

        uploadFormDescription.addEventListener('keydown', function(evt) {
            if (isEscape(evt)) {
                evt.stopPropagation();
            }
        });


        document.getElementById('upload-file').addEventListener('change', showUploadOverlay);

        hideUploadOverlay();
    }

    init();

})();