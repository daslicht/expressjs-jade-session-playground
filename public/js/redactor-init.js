$(document).ready(
    function()
    {
        $('#redactor-area').redactor({
              air: true,
             airButtons: ['formatting', '|', 'bold', 'italic', 'deleted','image', 'video', 'file', 'table', 'link' ],


            imageUpload: '/upload',
            fileUpload: '/upload',
            imageGetJson: '../demo/json/data.json'
        });
    }
);