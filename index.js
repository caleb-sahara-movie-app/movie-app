'use strict';

const getUrl = 'https://stupendous-expensive-domain.glitch.me/movies';
const getMovies = () => fetch(getUrl)
    .then(res => res.json())
    .then(movies => {
        console.log(movies)
        let renderMovie = ''
        for (let movie of movies) {
            let grabTitle = movie.title;
            let grabGenre = movie.genre;
            renderMovie += `<li class="card">
                            <p>${movie.title}</p>
                            <p>${movie.id}</p>
                            <button onclick="renderModal(this)" data-title="${grabTitle}" data-genre=${grabGenre} data-rating=${movie.rating} data-id=${movie.id} data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Edit Movie</button>
                            <button onclick="deleteMovie(this)" data-id=${movie.id}>Delete Movie</button></li>`
            $('#result').html(renderMovie)
        }

    })

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        $('#loader').remove()
        getMovies()
    }
};


const addMovie = () => {
    let movie = {title: $('#title').val(), genre: $('#genre').val(), rating: $('#rating').val()};
    fetch(`${getUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    })
        .then((data) => {
            getMovies()
        })
        .catch(console.error);
}


const deleteMovie = (ele) => {
    let dataID = $(ele).data('id')
    fetch(`${getUrl}/${dataID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((data) => {
            getMovies()
        })
        .catch(console.error);
    console.log(dataID)
}


const renderModal = (ele) => {
    let dataID = [($(ele).data('id')), ($(ele).data('title')), ($(ele).data('genre')), ($(ele).data('rating'))]

    console.log(`The edit button with an id of ${dataID[0]}, is titled: ${dataID[1]}, it's genre is: ${dataID[2]}, and has a rating of ${dataID[3]} has been clicked`)

    let createModal = ''
    createModal +=
        `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">What would you like to edit?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="w-100">
                    <div class="form-group m-3">
                        <label for="title-name" class="col-form-label">Title:</label>
                        <textarea class="form-control" id="title-type">${dataID[1]}</textarea>
                    </div>
                    <div class="form-group m-3">
                        <label for="genre-type" class="col-form-label">Genre: </label>
                        <textarea class="form-control" id="genre-type">${dataID[2]}</textarea>
                    </div>
                    <div class="form-group m-3">
                        <label for="rating-change" class="col-form-label">Current Rating: ${dataID[3]}</label>
                        <select class="form-control" id="rating-change">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick="editMovie(this)" data-id=${dataID[0]} class="updateChange btn btn-primary">Submit Changes</button>
            </div>
        </div>
    </div>
</div>`
    $('.putModal').html(createModal)
}

const editMovie = (ele) => {
    let movie = {title: $('#title-type').val(), genre: $('#genre-type').val(), rating: $('#rating-change').val()};
    let dataID = $(ele).data('id')
    console.log(movie)
    fetch(`${getUrl}/${dataID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    })
        .then((data) => {
            getMovies()
            $('.putModal').html('');
            $('body').removeClass('modal-open'); // .modal-open overrides default scrolling behavior, so i removed that and BAM
            $('.modal-backdrop').remove(); //removes that div class that is auto-injected in HTML
        })
        .catch(console.error);
}


/*---------- Event Listeners ---------*/
$('#addMovie').click((e) => {
    e.preventDefault()
    addMovie();
})





/*-------------------------------- themoviedb.org API Tests ----------------------------------*/
const posterUrl = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + themoviedb_API;

// Movie Poster Function
function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<img src=${posterUrl + movie.poster_path} data-movie-id=${movie.id}/>`;
        }
    });
}

// Select Elements from DOM
const moviesContainer = document.querySelector('#movies-container');



/*------------------ API requests -----------------*/

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=${themoviedb_API}`;
    return url;
}

// Responsible whenever we request new movies
function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

// Some Basic Error Handler
function handleError(error) {
    console.log('Error:', error);
}


function searchMovies(value) {
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleError);
}

function getUpcomingMovies(value) {
    const path = '/movie/upcoming';
    const url = generateUrl(path);

    const render = renderMovies.bind({ title: 'Upcoming Movies' })
    requestMovies(url, render, handleError);
}

function getTopRatedMovies(value) {
    const path = '/movie/top_rated';
    const url = generateUrl(path);

    const render = renderMovies.bind({ title: 'Top Rated Movies' })
    requestMovies(url, render, handleError);
}

function getPopularMovies(value) {
    const path = '/movie/popular';
    const url = generateUrl(path);

    const render = renderMovies.bind({ title: 'Popular Movies' })
    requestMovies(url, render, handleError);
}


/*---------- Render to HTML -----------*/

// Trying to figure out how convert vanilla JS to jQuery when adding new elements to document
function createMovieContainer(movies, title = '') {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    //const movieElement = $('body').add('<div>').addClass('movie')

    // Notice we're calling that function to feed into <section>
    const movieTemplate = `
      <h2>${title}</h2>
      <section class="section"> 
        ${movieSection(movies)}
      </section>

      <div class="content">
        <p id="content-close">X</p>
      </div>
  `;

    movieElement.innerHTML = movieTemplate;
    //movieElement.html(movieElement)
    return movieElement;
}


// We use this to populate upcoming, popular, and top-rated movies w/ different url paths
function renderMovies(data) {
    // data.results []
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title);
    $('#movies-container').append(movieBlock)
    console.log('Data:', data);
}


// Listener for the Search submit button
$('#search-submit').click((e) => {
    e.preventDefault();
    let value = $('#search-input').val()
    searchMovies(value);

    value = '';
    console.log('Input Value: ', value);
});


// Render the result of searched movies
function renderSearchMovies(data) {
    // data.results []
    $('#search-result').html('');
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    $('#search-result').append(movieBlock);
    console.log('Data:', data);
}
/*--------- Invoke API Requests ----------*/
searchMovies('Khan');

getUpcomingMovies();

getPopularMovies();

getTopRatedMovies();









