'use srtict';

(function () {
    var filterForm = document.querySelector('.upload-filter');
    var filterFormMinusBtn = filterForm.querySelector('.upload-resize-controls-button-dec');
    var filterFormPlusBtn = filterForm.querySelector('.upload-resize-controls-button-inc');
    var filterFormPreview = filterForm.querySelector('.filter-image-preview');
    var filterFormResizeInput = filterForm.querySelector('input[type="text"]');
    var filterControls = document.querySelector('.upload-filter-controls');
    var uploadImgForm = document.querySelector('.upload-image');

    var uploadForm = document.querySelector('#upload-select-image');
    var uploadFormCancel = document.querySelector('.upload-form-cancel');
    var uploadFormSubmit = document.querySelector('.upload-form-submit');
    var uploadFormDescription = document.querySelector('.upload-form-description');

    var MAX_RESIZE = '100%';
    var MIN_RESIZE = '25%';
    var STEP_RESIZE = 25;

    uploadForm.classList.remove('invisible');

    uploadFormCancel.addEventListener('click', function() {
        hideUploadOverlay();
    });

    uploadFormCancel.addEventListener('keydown', function(evt) {
        if (isEnter(evt)){
            hideUploadOverlay();
        };
    });

    uploadFormSubmit.addEventListener('keydown', function(evt) {
        if (isEnter(evt)){
            hideUploadOverlay();
        };
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

    function setFilter(evt) {
        if (evt.target.checked) {
            filterFormPreview.className = 'filter-image-preview filter-' + evt.target.value;
        }
    }

    filterControls.addEventListener('click', function(evt) {
        setFilter(evt);
    });

    filterControls.addEventListener('keydown', function(evt) {
        if (isEnter(evt)){
            setFilter();
            //console.log('hi');
        }
    });

    function clearFilterForm() {
        uploadImgForm.reset();
        filterForm.reset();
        filterFormResizeInput.setAttribute('value', '100%');
        filterFormPreview.style.transform = 'scale(1)';
        filterFormPreview.className = 'filter-image-preview';
    }

    function hideUploadOverlay(evt) {
        uploadOverlay.classList.add('invisible');
        clearFilterForm();
    }
})();
