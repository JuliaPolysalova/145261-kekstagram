'use strict';

window.initializeScale = function (scale, plus, minus, maxScale, minScale, scaleStep, cb) {
    var actualScale = scale;

    minScale = parseInt(minScale, 10);
    maxScale = parseInt(maxScale, 10);
    scaleStep = parseInt(scaleStep, 10)

    plus.addEventListener('click', function () {
        if (actualScale+scaleStep <= maxScale) {
            actualScale += scaleStep;
        }
        cb (actualScale);
    });

    minus.addEventListener('click', function () {
        if (actualScale-scaleStep >= minScale) {
            actualScale -= scaleStep;
        }
        cb (actualScale);
    });
}