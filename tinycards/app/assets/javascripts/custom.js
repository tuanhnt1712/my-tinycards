function openTab(tabName,titleName) {
  var i, x;
  x = document.getElementsByClassName("containerTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  if (titleName == "bb1"){
    document.getElementById('bb1').classList.add("s-active");
    document.getElementById('bb2').classList.remove("s-active");
  }
  else {
    document.getElementById('bb2').classList.add("s-active");
    document.getElementById('bb1').classList.remove("s-active");
  }

  document.getElementById(tabName).style.display = "block";
}

$(document).ready(function() {
  $("#imgInp").change(function() {
    readURL(this);
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#blah').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
    document.getElementById('preview-img').classList.add("preview-img");
    $('#coverImgModal').modal('hide');
  }
}
