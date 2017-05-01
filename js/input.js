'use strict';

(function () {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var fileChooser = document.querySelector('.upload input[type=file]');
    var preview = document.querySelector('.filter-image-preview');

    fileChooser.addEventListener('change', function () {
        debugger;
        var file = fileChooser.files[0];
        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function (it) {
            return fileName.endsWith(it);
        });

        if (matches) {
            var reader = new FileReader();

            reader.addEventListener('load', function () {
                preview.src = reader.result;
            });

            reader.readAsDataURL(file);
        }
    });
})();