'use strict';

window.data = (function () {
    var ESCAPE_KEY_CODE = 27;
    var ENTER_KEY_CODE = 13;
    var uploadOverlay = document.querySelector('.upload-overlay');

    function isEnter(evt) {
        return evt.keyCode === ENTER_KEY_CODE;
    }

    function isEscape(evt) {
        return evt.keyCode === ESCAPE_KEY_CODE;
    }

    return {
        isEnter: isEnter,
        isEscape: isEscape
    };
})();