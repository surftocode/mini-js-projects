const APIkey = "60ab165f0d6c3bb6d32d6a2a96f966e7";
const baseURL = "https://api.themoviedb.org/3";
const myUrl = `${baseURL}/movie/popular?api_key=${APIkey}&page=1`;
const imgPath = "https://image.tmdb.org/t/p/original";

const form = document.getElementById("form");
const search = form.elements.search;
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
    const { title, overview, vote_average, poster_path } = item;
    const filmElement = document.createElement("div");
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
    filmArea.appendChild(filmElement);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const arananFilm = search.value.toLowerCase().trim();
  console.log("aranan film", arananFilm);
  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(arananFilm);
  });

  if (!arananFilm) {
    alert("Film giriniz");
    return;
  }
  if (filteredMovies > 0) {
    const searchAPI = `${baseURL}/search/movie?api_key=${APIkey}&query=${arananFilm}`;
    search.value = "";
    allMovies(searchAPI.results);
    console.log("filtered movies", filteredMovies);
  } else {
    alert("Aradığınız film bulunamadı!");
  }
});
