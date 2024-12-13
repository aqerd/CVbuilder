$(document).ready(function(){
    $('button').click(function(){
        if ($(this).hasClass('current') || $(this).hasClass('filetype')) {
            $('button').removeClass('current');
            $(this).addClass('current');
        }
        var format = $(this).data('format');
        $.post('/set_format', {format: format}, function(response) {
        });
    });
});