function openTab(tabName, titleName) {
  var i, x, shows;
  x = document.getElementsByClassName("n-link");
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
  }

  shows = document.getElementsByClassName("show-value");
  for (i = 0; i < shows.length; i++) {
    shows[i].style.display = "none";
  }

  $(tabName).addClass("active");
  $(titleName).css("display", "block");
}

$(document).ready(function() {
  $(".ct-card").click(function() {
    $(this).toggleClass('flipped');
  });
});
