const APIkey = "3e63fb5bdd5cafa1ecff609b8996f736";
const baseURL = "https://api.themoviedb.org/3";
const myUrl = `${baseURL}/movie/popular?${APIkey}&page=1`;
const imgPath = "https://image.tmdb.org/t/p/original";

const searchAPI = `${baseURL}/search/movie?query=${searchMovie}`;

const form = document.getElementById("form");
const search = document.getElementById("search");
const filmArea = document.querySelector(".filmArea");

allMovies(myUrl);

async function allMovies(url) {
  const response = await fetch(url);
  const responseData = response.json();
  filmleriGoster(responseData.results);
}

async function filmleriGoster(film) {
  filmArea.innerHTML = "";
  film.forEach((item) => {
    const { title, overview, release_date, vote_average, poster_path } = item;
    const filmElement = document.createElement("div");
    filmElement.classList("movie");
    filmElement.innerHTML = `
      <img src="${imgPath}+poster_path" alt="${title}"/>
      <div class="movie-info">
      <h3> ${title}
      <span>
      "${filmOranı(vote_average)}">${vote_average}"</span>
      </h3>
      </div>
      <div>
      <h3>
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
    search.value = "";
  }
});
