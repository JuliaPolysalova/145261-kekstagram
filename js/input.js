'use strict';
(function () {
    var fileChooser = document.querySelector('.upload input[type=file]');
    var preview = document.querySelector('.filter-image-preview');
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    function optimizeSize(picture) {
        var width = parseInt(picture.width, 10);
        var height = parseInt(picture.height, 10);
        if (width > height) {
            var widthShift = (width - 587) / 2;
            picture.style.transform = 'translateX(-' + widthShift + 'px)';
        }
    }

    fileChooser.addEventListener('change', function () {
        var file = fileChooser.files[0];
        if (!file) {
            return;
        }
        var fileName = file.name.toLowerCase();
        var check = FILE_TYPES.some(function (it) {
            return fileName.endsWith(it);
        });
        if (check) {
            var reader = new FileReader();
            reader.addEventListener('load', function () {
                preview.src = reader.result;
                preview.style.height = '587px';
            });
            reader.readAsDataURL(file);
            reader.addEventListener('loadend', function (evt) {
                optimizeSize(preview);
            });
        }
    });
})();