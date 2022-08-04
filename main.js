function init() {
  document
    .querySelector(".buttonWrapper")
    .addEventListener("click", () => toggleNavgigation());
}
function toggleNavgigation() {
  document.querySelector(".navigation").classList.toggle("is--active");
  document.querySelector(".button--none").classList.toggle("is--active");
}

init();
