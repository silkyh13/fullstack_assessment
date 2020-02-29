window.onload = function() {
  setTimeout(media, 400);
  setTimeout(content, 800);
  setTimeout(image, 800);
};
function image() {
  var img = document.querySelector("#img");
  img.style.opacity = "1";
  img.style.transform = "translate(0)";
}
function media() {
  var list = document.querySelectorAll(".media li");
  for (var i = 0; i < list.length; i++) {
    list[i].style.opacity = "1";
    list[i].style.transform = "translate(0)";
  }
}
function content() {
  var header = document.querySelector(".content h1");
  header.style.opacity = "1";
  header.style.transform = "translate(0)";
  var p = document.querySelector(".content p");
  p.style.opacity = "1";
  p.style.transform = "translate(0)";
  var b = document.querySelector(".content button");
  b.style.opacity = "1";
  b.style.transform = "translate(0)";
}
