function router() {
  const pages = document.querySelectorAll(".pages");
  const hash = location.hash || "#home";
  pages.forEach((p) => {
    p.style.display = "none";
  });
  document.querySelector(hash).style.display = "block";
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
