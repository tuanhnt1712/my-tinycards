$(document).ready(function() {
  $('.search-input').on('focus', function(){
    $(this).removeAttr('placeholder');
    $('.search-form').addClass('search-input-focus');
  });

  $('.search-input').on('blur', function(){
    $(this).attr('placeholder', 'Search');
    $('.search-form').removeClass('search-input-focus');
  });
});
