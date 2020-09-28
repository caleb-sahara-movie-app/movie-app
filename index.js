'use strict';

const getUrl = 'https://stupendous-expensive-domain.glitch.me/movies';
const getMovies = () => fetch(getUrl)
    .then(res => res.json())
    .then(movies => {
        console.log(movies[0].vote_average)
        console.log(movies)
        let renderMovie = ''
        if (movies.length === 0)
            $('#result').html('')
        else
            for (let movie of movies) {
                let grabID = movie.id;
                renderMovie +=
                    `<div class="movieFromAPI mx-3">
                        <button class="btn btn-danger" onclick="deleteMovie(this)" data-id=${grabID}>Delete Movie</button>
                        <button class="btn btn-primary mt-5" onclick="renderModal(this)" data-rating=${movies[0].vote_average} data-id=${grabID} data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Edit Movie</button>
                        <img id="movieImg" src=${posterUrl + movie.poster_path} data-movie-id=${movie.id}/>
                    </div>`

                $('#result').html(renderMovie);
            }

    })

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        $('#loader').remove()
        getMovies()
    }
};

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

    console.log($(ele)[0].attributes[2].nodeValue)
    let dataID = [($(ele)[0].attributes[2].nodeValue), ($(ele)[0].attributes[3].nodeValue)]
    // let userRating = $('#rating-change').val();

    let createModal = ''
    createModal +=
        `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Rate this Movie</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="w-100">
                    <div class="form-group m-3">
                        <label for="rating-change" class="col-form-label">Current Rating: ${dataID[0]}</label>
                        <select class="form-control" id="rating-change">
                            <option selected="true" disabled>Please select a rating:</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button id="rating" type="button" onClick="editMovie(this)" data-id=${dataID[1]} data-rating="" class="updateChange btn btn-primary">Submit Changes</button>
            </div>
        </div>
    </div>
</div>`

    $('.putModal').html(createModal)
    // const userRating = function () {
    //     $('#rating-change').change(function () {return $(this).val();})
    // }
    //${$('#rating-change').change(function () {return $(this).val();})}
    let rating = document.getElementById('rating-change').value;
    console.log(rating)
    $('#rating-change').change(function() {
        rating = '';

        rating = ($(this).val())
        console.log(rating)
        $('#rating').attr({'data-rating': `${rating}`})
    })
}


/*-------------------------------- themoviedb.org API Tests ----------------------------------*/
const posterUrl = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + themoviedb_API;


// Movie Poster Function
function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            let renderMovie = ''
            for (movie of movies) {
                let grabID = movie.id;
                renderMovie +=
                    `<div class="movieFromAPI mx-3">
                        <button class="mt-5" onclick="renderModal(this)" data-rating=${movie.rating} data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Edit Movie</button>
                        <button class="btn btn-success" id="addMovie" onclick="addMovie(this)" data-movie-id=${grabID} class="mr-4 mt-3"><i class="fas fa-plus"></i></button>
                        <img id="movieImg" src=${posterUrl + movie.poster_path} data-movie-id=${movie.id}/>
                    </div>`
            }
            return renderMovie;
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

// function getUpcomingMovies(value) {
//     const path = '/movie/upcoming';
//     const url = generateUrl(path);
//
//     const render = renderMovies.bind({title: 'Upcoming Movies'})
//     requestMovies(url, render, handleError);
// }

function getTopRatedMovies(value) {
    const path = '/movie/top_rated';
    const url = generateUrl(path);

    const render = renderMovies.bind({title: 'Top Rated Movies'})
    requestMovies(url, render, handleError);
}

function getPopularMovies(value) {
    const path = '/movie/popular';
    const url = generateUrl(path);

    const render = renderMovies.bind({title: 'Popular Movies'})
    requestMovies(url, render, handleError);
}

function addMovie(ele) {
    let movieID = $(ele)[0].attributes[2].nodeValue;

    const path = `/movie/${movieID}`
    const url = generateUrl(path);

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let addedMovie = data;
            console.log(addedMovie) //logs clicked movie data
            fetch(`${getUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addedMovie)
            })
                .then((data) => data.json())
                .then(movie => {
                    getMovies()
                })
                // getMovies()

                .catch(console.error);
        })


}

const editMovie = (ele) => {
   //target for API
    let rating = ($(ele)[0].attributes[4].nodeValue)
    let dataID = ($(ele)[0].attributes[3].nodeValue)
    console.log("The id is: " + dataID)

    const path = `/movie/${dataID}/rating`;
    const url = generateUrl(path);
    console.log(url)
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rating)
    })


    // console.log($(ele))
    // let rating = {'vote_average' : ($(ele)[0].attributes[4].nodeValue)}
    // let dataID = ($(ele)[0].attributes[3].nodeValue)
    // fetch(`${getUrl}/${dataID}`, {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(rating)
    // })
        .then((data) => {
            getMovies()
            $('.putModal').html('');
            $('body').removeClass('modal-open'); // .modal-open overrides default scrolling behavior, so i removed that and BAM
            $('.modal-backdrop').remove(); //removes that div class that is auto-injected in HTML
        })
        .catch(console.error);
}
/*---------- Render to HTML -----------*/

// Trying to figure out how convert vanilla JS to jQuery when adding new elements to document
function createMovieContainer(movies, title = '') {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
     <h2>${title}</h2>
     <section class="section"> 
        ${movieSection(movies)}
      </section>
       `;
    // Notice we're calling that function to feed into <section> : movieSection() on ln.146

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}


// We use this to populate upcoming, popular, and top-rated movies w/ different url paths
function renderMovies(data) {
    // data.results []
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title);
    $('#movies-container').append(movieBlock)
    // console.log('Data:', data);
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
    // console.log('Data:', data);
}

/*--------- Invoke API Requests ----------*/
searchMovies();

//getUpcomingMovies();

getPopularMovies();

getTopRatedMovies();









