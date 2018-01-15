function remove_fields(link) {
  a = $(link).closest("div").closest("div").find('#destroy').val(1);
  $(link).closest("div").remove();
}

function add_fields(link, association, content) {
  var new_id = new Date().getTime();
  var regexp = new RegExp("new_" + association, "g")
  if($('.prepend-body-content').length === 0) {
    $('.card-body').append(content.replace(regexp, new_id));
  } else {
    $('.card-body').prepend(content.replace(regexp, new_id));
  }
}

$(document).ready(function() {
  $(".ct-card").click(function() {
    $(this).toggleClass('flipped');
  });
});
