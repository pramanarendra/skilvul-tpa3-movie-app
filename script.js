// URL Settings

const API_key = "cf0bb3ca1bf718a2c9602efcec812bde";
const base_URL = "https://api.themoviedb.org/3";
const API_URL = `${base_URL}/discover/movie?api_key=${API_key}&sort_by=popularity.desc&page=1`;
const img_URL = "https://image.tmdb.org/t/p/w500";


//  get DOM elements
const container = document.getElementById("card-container");
const form = document.getElementById("form");
const search = document.getElementById("search");

//  get movies data from API
const getMovies = async url => {
    let response = await fetch(url);
    let movies = await response.json();
    showMovies(movies.results);
};

getMovies(API_URL);

//  show movies data in HTML
const showMovies = movies => {    
    movies.forEach(movie => {
        const {title, poster_path, release_date, vote_average} = movie;

        const add = document.createElement('div');
        add.classList.add('card');
        add.innerHTML =
            `<img src="${img_URL+poster_path}" alt="${title}" class="movie-img">
            <div class="movie-info">
                <p class="movie-title">${title}</p>
                <div class="movie-detail">
                    <p class="movie-date">${release_date}</p>
                    <p class="movie-rating">${vote_average}</p>
                </div>
            </div>`

        container.appendChild(add);
    })
}

//  search feature
form.addEventListener('submit', ev => {
    ev.preventDefault();

    container.innerHTML = "";

    const word = search.value;
    const search_URL = `${base_URL}/search/movie?api_key=${API_key}&query=${word}&page=1`

    if(word) {
        getMovies(search_URL);
    } else {
        getMovies(API_URL);
    }
})