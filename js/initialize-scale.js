'use strict';

window.initializeScale = (function (scale, plus, minus, maxScale, minScale, scaleStep, cb) {
    var actualScale = scale;
    plus.addEventListener('click', function () {
        if (actualScale !== maxScale) {
            actualScale += scaleStep;
        }
        cb (actualScale);
    });

    minus.addEventListener('click', function () {
        if (actualScale !== minScale) {
            actualScale -= scaleStep;
        }
        cb (actualScale);
    })
});

/* var initializeScale = (function (scale, plus, minus, maxScale, minScale, scaleStep, cb) {
 var actualScale = scale;
 plus.addEventListener('click', function () {
 if (actualScale !== maxScale) {
 actualScale += scaleStep;
 }
 cb (actualScale);
 });

 minus.addEventListener('click', function () {
 if (actualScale !== minScale) {
 actualScale -= scaleStep;
 }
 cb (actualScale);
 })
 });

 initializeScale(100, filterFormPlusBtn, filterFormMinusBtn, MAX_RESIZE, MIN_RESIZE, STEP_RESIZE, function () {
 var sizeValue = parseInt(filterFormResizeInput.value, 10);
 filterFormResizeInput.setAttribute('value', sizeValue + '%');
 filterFormPreview.style.transform = 'scale(' + sizeValue / 100 + ')';
 });*/