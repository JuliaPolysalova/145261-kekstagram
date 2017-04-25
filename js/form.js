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
    var STEP_RESIZE = 25;
    var ESCAPE_KEY_CODE = 27;
    var ENTER_KEY_CODE = 13;

    var currentFilter = null;
    var currentFilterValue = 1;

    function clearFilterForm() {
        uploadImgForm.reset();
        filterForm.reset();
        filterFormResizeInput.setAttribute('value', '100%');
        filterFormPreview.style.transform = 'scale(1)';
        filterFormPreview.className = 'filter-image-preview';
    }

    function setScale(sizeLimit, sign) {
        var stepSize;
        var sizeValue;
        if (filterFormResizeInput.value !== sizeLimit) {
            stepSize = sign ? STEP_RESIZE : -STEP_RESIZE;
            sizeValue = parseInt(filterFormResizeInput.value, 10) + stepSize;
            filterFormResizeInput.setAttribute('value', sizeValue + '%');
            filterFormPreview.style.transform = 'scale(' + sizeValue / 100 + ')';
        }
    }


    var filterLevelScale = document.querySelector('.upload-filter-level-line');
    var filterLevelValue = document.querySelector('.upload-filter-level-val');
    var filterLevelPin = document.querySelector('.upload-filter-level-pin');

    //var filterCoordinateStart = filterScaleCoordinates.left;
    //var filterCoordinateEnd = filterScaleCoordinates.right;
    var filterCoordinateX;
    var filterScaleCoordinates = filterLevelScale.getBoundingClientRect();

    var onFilterScalePinMousedown = function (evt) {
        evt.preventDefault();
        filterCoordinateX = evt.clientX;

        document.addEventListener('mousemove', onFilterScalePinMouseMove);
        document.addEventListener('mouseup', onFilterScalePinMouseUp);
    };

    var onFilterScalePinMouseMove = function (evt) {
        evt.preventDefault();
        var shiftCoordinateX = filterCoordinateX - evt.clientX;
        var newValueForElementStyle = filterLevelPin.offsetLeft - shiftCoordinateX + 'px';
        filterCoordinateX = evt.clientX;
        if (filterCoordinateX >= filterCoordinateStart && filterCoordinateX <= filterCoordinateEnd) {
            filterLevelPin.style.left = newValueForElementStyle;
            filterLevelValue.style.width = newValueForElementStyle;
            changeFilterLevel(filterCoordinateX);
        } else if (filterCoordinateX < filterCoordinateStart) {
            filterCoordinateX = filterCoordinateStart;
        } else if (filterCoordinateX > filterCoordinateEnd) {
            filterCoordinateX = filterCoordinateEnd;
        }
    };

    var onFilterScalePinMouseUp = function (evt) {
        evt.preventDefault();
        document.removeEventListener('mousemove', onFilterScalePinMouseMove);
        document.removeEventListener('mouseup', onFilterScalePinMouseUp);
    };

    filterLevelPin.addEventListener('mousedown', onFilterScalePinMousedown);

    function changeFilterLevel(coordinate) {
        var currentFilter = filterForm.querySelector('input[type=radio]:checked');
        var filterName = currentFilter.value;
        var _coordinate = coordinate - filterScaleCoordinates.left;
        var coeficient = '';
        var styleFilter = '';
        var unit = '';
        switch (filterName) {
            case 'chrome':
                coeficient = 1;
                styleFilter = 'grayscale';
                break;
            case 'sepia':
                coeficient = 1;
                styleFilter = 'sepia';
                break;
            case 'marvin':
                coeficient = 100;
                styleFilter = 'invert';
                unit = '%';
                break;
            case 'phobos':
                coeficient = 3;
                styleFilter = 'blur';
                unit = 'px';
                break;
            case 'heat':
                coeficient = 3;
                styleFilter = 'brightness';
                break;
            default:
                coeficient = '';
                styleFilter = 'none';
        }
        var level = _coordinate / (filterScaleCoordinates.width / coeficient);
        picturePreview.style.filter = styleFilter + '(' + level + unit + ')';
    }

    function setFilter(evt) {
        if (evt.target.localName === 'label') {
            evt.target.click();
        } else if (evt.target.localName === 'input' && evt.target.checked) {
            if (currentFilter !== evt.target.value) {
                currentFilterValue = 1;
                currentFilter = evt.target.value;
                if(currentFilter == 'none') {
                    filterControls.classList.add('invisble');
                } else {
                    filterControls.classList.remove('invisble');
                }
                console.log(currentFilter);
            }
            filterFormPreview.className = 'filter-image-preview filter-' + evt.target.value;
        }
    }

    function isEnter(evt) {
        return evt.keyCode === ENTER_KEY_CODE;
    }

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
        filterControls.classList.add('invisble');
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

        filterFormPlusBtn.addEventListener('click', function(evt) {
            setScale(MAX_RESIZE, 1);
        });

        filterFormMinusBtn.addEventListener('click', function(evt){
            setScale(MIN_RESIZE, 0);
        });

        filterControls.addEventListener('click', function(evt) {
            setFilter(evt);
        });

        filterControls.addEventListener('keydown', function(evt) {
            if (isEnter(evt)){
                //evt.preventDefault();
                setFilter(evt);
            }
        });

        document.getElementById('upload-file').addEventListener('change', showUploadOverlay);

        hideUploadOverlay();
    }

    init();

})();
