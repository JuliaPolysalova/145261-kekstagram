'use strict';

window.initializeFilters = function (controls, callback) {
    var isEnter = function(evt) {
        return evt.keyCode === 13;
    };

    controls.addEventListener('click', function(evt) {
        setFilter(evt);
    });

    controls.addEventListener('keydown', function(evt) {
        if (isEnter(evt)) {
            setFilter(evt);
        }
    });

    var setFilter = function (evt) {
        var currentFilter = evt.target.value;
        var filterFormPreview = document.querySelector('.filter-image-preview');

        if (evt.target.localName === 'label') {
            evt.target.click();
        } else if (evt.target.localName === 'input' && evt.target.checked) {
            if (currentFilter !== evt.target.value){
                callback(currentFilter);
            }
            filterFormPreview.className = 'filter-image-preview filter-' + evt.target.value;
        }
     }
}