const APIkey = "60ab165f0d6c3bb6d32d6a2a96f966e7";
const baseURL = "https://api.themoviedb.org/3";
const myUrl = `${baseURL}/movie/popular?api_key=${APIkey}&page=1`;
const imgPath = "https://image.tmdb.org/t/p/original";

const form = document.getElementById("form");
const search = document.querySelector("#search");
const filmArea = document.querySelector(".filmArea");

allMovies(myUrl);

async function allMovies(url) {
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    const movies = responseData.results;
    filmleriGoster(movies);
  } catch (error) {
    console.error("API hatası", error);
    return;
  }
}

async function filmleriGoster(film) {
  filmArea.innerHTML = "";
  await film.forEach((item) => {
    const { id, title, overview, vote_average, poster_path } = item;
    const filmElement = document.createElement("button");
    filmElement.classList.add("movie");
    filmElement.innerHTML = `
      <img src="${imgPath}${poster_path}" alt="${title}"/>
      <div class="movie-info">
      <h3> ${title}
      <span>filmOranı
      ${vote_average}</span>
      </h3>
      </div>
      <div class="overview">
      <h3 >
      Açıklama:</h3>${overview}</div>
      `;
    filmElement.addEventListener("click", () => {
      window.location.href = `movie_detail.html?id=${id}`;
    });
    filmArea.appendChild(filmElement);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const arananFilm = search.value.toLowerCase().trim();

  const searchAPI = `${baseURL}/search/movie?api_key=${APIkey}&query=${encodeURIComponent(
    arananFilm
  )}`;

  if (allMovies(searchAPI).length === 0) {
    alert("aradığınız film bulunamadı!");
  }
  if (!arananFilm) {
    alert("Film giriniz");
    return;
  }
  if (arananFilm && arananFilm !== "") {
    allMovies(searchAPI);
    search.value = "";
  }
});
