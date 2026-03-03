function router() {
  const pages = document.querySelectorAll(".page");
  const hash = location.hash || "#home";
  pages.forEach((page) => {
    page.style.display = "none";
  });
  document.querySelector(hash).style.display = "block";
}

window.addEventListener("load", router);
window.addEventListener("hashchange", router);

