const APIkey = "60ab165f0d6c3bb6d32d6a2a96f966e7";
const baseURL = "https://api.themoviedb.org/3";
const myUrl = `${baseURL}/movie/popular?api_key=${APIkey}&page=1`;
const imgPath = "https://image.tmdb.org/t/p/original";

const form = document.getElementById("form");
const search = form.elements.search;
const filmArea = document.querySelector(".filmArea");
const searchAPI = `${baseURL}/search/movie?query=${search}`;

allMovies(myUrl);

async function allMovies(url) {
  const response = await fetch(url);
  const responseData = await response.json();
  console.log(responseData.results);
  filmleriGoster(responseData.results);
}

async function filmleriGoster(film) {
  filmArea.innerHTML = "";
   film.forEach((item) => {
    const { title, overview, release_date, vote_average, poster_path } = item;
    const filmElement = document.createElement("div");
    filmElement.classList.add("movie");
    filmElement.innerHTML = `
      <img src="${imgPath}${poster_path}" alt="${title}"/>
      <div class="movie-info">
      <h3> ${title}
      <span>filmOranı
      "${vote_average}">${vote_average}"</span>
      </h3>
      </div>
      <div class="overview">
      <h3 ">
      Açıklama:</h3>"${overview}"</div>
      `;
    filmArea.appendChild(filmElement);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const arananFilm = search.value;
  if (arananFilm) {
    allMovies(searchAPI + arananFilm);
    console.log(arananFilm);
    search.value = "";
  }
});
