const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3bde7edb94d1adbc7a864cacabad41a0&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const search = document.getElementById("search");

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3bde7edb94d1adbc7a864cacabad41a0&query="';

const form = document.getElementById("form");
const main = document.querySelector(".main");

getMovies(API_URL);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      
            <img src="${IMG_PATH + poster_path}"
                alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="green">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>${overview}</h3>
                
            </div>

      
      `;
    main.appendChild(movieEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
