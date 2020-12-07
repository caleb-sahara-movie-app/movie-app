'use strict';

/*--------------------------- All functions associated with database info: 5-159 -----------------------------*/

//Get Information from our database (WATCHLIST) and display a Movie object in our watchlist
const getUrl = 'https://goldenrod-spotty-woolen.glitch.me/movies';
const getMovies = () => fetch(getUrl)
    .then(res => res.json())
    .then(movies => {

        let renderMovie = ''
        if (movies.length === 0)
            $('#result').html('')
            //  $('.modal-dialog').html('')
        else
            for (let movie of movies) {
                console.log(movies)
                let grabID = movie.id;
                renderMovie +=
                    `<div class="movieFromAPI mx-3">
                        <button class="btn btn-danger" onclick="deleteMovie(this)" data-id=${grabID}>Delete Movie</button>
                        <button class="btn btn-primary mt-5" onclick="renderModal(${movie.id}, ${movie.vote_average})" data-rating=${movie.vote_average} data-id=${grabID} data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Edit Movie</button>
                        <img id="movieImg" src=${posterUrl + movie.poster_path} data-movie-id=${movie.id}/>
                    </div>`

                $('#result').html(renderMovie);
            }

    })

// Loader function that will display a loading message until our movies are retrieved from database
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        $('#loader').remove()
        getMovies()
    }
};
// Function that will handle adding a movie to database
function addMovie(ele) {
    let movieID = $(ele)[0].attributes[3].nodeValue; //Attribute for ID has moved indexes
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
                .then(getMovies)
                .catch(console.error);
        })
}
// Function that will handle deleting a movie from database
const deleteMovie = (ele) => {
    let dataID = $(ele).data('id')
    fetch(`${getUrl}/${dataID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(getMovies)
        .catch(console.error);
    console.log(dataID)
}

// Function that will handle editing a movie in the database
const editMovie = (id, rating) => {

    let updateAverage = {'vote_average': rating}
    fetch(`${getUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateAverage)
    })
        .then((res => res.json()))
        .then((data) => {
            getMovies()
        })
        .catch(console.error);
}

// Function that will render a modal so a user can edit a movie in the database
const renderModal = (id, rate) => {
    console.log("id: "+id+ ", rating: "+ rate)
    let createModal = ''
    createModal +=
        `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Rate this Movie</h5>
                <button type="button" class="close" data-dismiss="modal2" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="w-100">
                    <div class="form-group m-3">
                        <label for="rating-change" class="col-form-label">Current Rating: ${rate}</label>
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
                <button type="button" class="btn btn-secondary" data-dismiss="modal2">Close</button>         
                <button class="updateChange btn btn-primary" data-rating="" data-toggle="" id="rating" type="submit">Submit Changes</button>
            </div>
        </div>
    </div>
</div>`

    $('.putModal').html(createModal)

    let rating = document.getElementById('rating-change').value;
    console.log(rating)
    $('#rating-change').change(function () {
        rating = '';
        rating = ($(this).val())
        $('#rating').attr('data-rating', rating);
    })

    $(document).on('click', '#rating', function(){
        let rating = $('#rating').attr('data-rating');
        console.log("updated value: "+rating)
        console.log("id: "+ id)
        editMovie(id, rating)
    });

    $("button[data-dismiss=modal2]").click(function(){
        $('#exampleModal').modal('hide');
    })

}
// Edit modal close override
$("button[data-dismiss=modal1]").click(function(){
    $('#myModal').modal('hide');
});

/*-------------------------------- Information That Will Display Movies To Landing Page ----------------------------------*/
//          URL info for API Requests
const posterUrl = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + themoviedb_API;
function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=${themoviedb_API}`;
    return url;
}
//          Will request Movie info based on URL path
function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            return data;
        })
        .then(onComplete)
        .catch(onError);
}

// Some Basic Error Handler
function handleError(error) {
    console.log('Error:', error);
}

//------------------------------------ Event Listener and Functions for Searching -------------------------//
$('#search-result').hide()
$('#search-input').keyup((e) => {
    $('#movies-container').hide()
    $('#search-result').show()
    e.preventDefault();
    let value = $('#search-input').val()
    if (value === "") {
        $('#search-result').hide()
        $('#movies-container').show()
    }
    searchMovies(value);
});
function renderSearchMovies(data) {
    console.log(data.results)
    if (data.results[0].id === 680304) {
        $('#search-result').html('');
    } else {
        $('#search-result').html('');
        const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        $('#search-result').append(movieBlock);
    }
}
function searchMovies(value) {
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleError);
}

//------------------------------------ Event Listener and Function forEach Sorting Value -------------------------//
// Upcoming Movies
$('#upcoming').click(function() {
    getUpcomingMovies();
    $('#movies-container').html('')
})
function getUpcomingMovies(value) {
    const path = '/movie/upcoming';
    const url = generateUrl(path);
    const render = renderMovies.bind({title: 'Upcoming'})
    requestMovies(url, render, handleError);
}

// Trending Movies
$('#trending').click(function() {
    getTrendingMovies();
    $('#movies-container').html('');
})
function getTrendingMovies(value) {
    const path = '/trending/movie/week';
    const url = generateUrl(path);
    const render = renderMovies.bind({title: "What's Trending?"})
    requestMovies(url, render, handleError);
}

// Popular Movies
$('#popular').click(function() {
    getPopularMovies();
    $('#movies-container').html('');
})
function getPopularMovies(value) {
    const path = '/movie/popular';
    const url = generateUrl(path);
    const render = renderMovies.bind({title: 'Popular Movies'})
    requestMovies(url, render, handleError);
}

// Top Rated Movies
$('#rating').click(function() {
    getTopRatedMovies();
    $('#movies-container').html('')
})
function getTopRatedMovies(value) {
    const path = '/movie/top_rated';
    const url = generateUrl(path);
    const render = renderMovies.bind({title: 'Top Rated Movies'})
    requestMovies(url, render, handleError);
}
// Genres
$('#action').click(function() {
    getGenre(28, 'Action');
    $('#movies-container').html('')
})

$('#adventure').click(function() {
    getGenre(12, 'Adventure');
    $('#movies-container').html('')
})

$('#animation').click(function() {
    getGenre(16, 'Animation');
    $('#movies-container').html('')
})

$('#comedy').click(function() {
    getGenre(35, 'Comedy');
    $('#movies-container').html('')
})

$('#crime').click(function() {
    getGenre(80, 'Crime');
    $('#movies-container').html('')
})

$('#drama').click(function() {
    getGenre(18, 'Drama');
    $('#movies-container').html('')
})

$('#family').click(function() {
    getGenre(10751, 'Family');
    $('#movies-container').html('')
})

$('#fantasy').click(function() {
    getGenre(14, 'Fantasy');
    $('#movies-container').html('')
})

$('#history').click(function() {
    getGenre(36, 'History');
    $('#movies-container').html('')
})

$('#horror').click(function() {
    getGenre(27, 'Horror');
    $('#movies-container').html('')
})

$('#music').click(function() {
    getGenre(10402, 'Music');
    $('#movies-container').html('')
})

$('#romance').click(function() {
    getGenre(10749, 'Romance');
    $('#movies-container').html('')
})

$('#scifi').click(function() {
    getGenre(878, 'Sci Fi');
    $('#movies-container').html('')
})

$('#thriller').click(function() {
    getGenre(53, 'Thriller');
    $('#movies-container').html('')
})
function getGenre(genre_id, genre_name) {
     //const path = '/genre/movie/list';
    const path = '/genre/' + genre_id + '/movies';
    const url = generateUrl(path);
    const render = renderMovies.bind({title: genre_name});
    requestMovies(url, render, handleError);
}


//---------------------------------- This function will take passed values from event listeners ------------------------------//
//---------------------------- and send it to createMovieContainer() to build a movie section in HTML ------------------------------//
function renderMovies(data) {
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title);
    $('#movies-container').append(movieBlock)
}

// Will generate a Container for passed Movies to be placed in HTML
function createMovieContainer(movies, title = '') {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
     <h2>${title}</h2>
     <section class="section"> 
        ${movieSection(movies)}
      </section>`;
    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

// Will generate a Movie Section that contains each Movie from passed movies object. Will be passed into createMovieContainer()
function movieSection(movies) {
    let renderMovie = ''
    for (let movie of movies) {
        if (movie.poster_path) {
            let grabID = movie.id;
            renderMovie +=
                `<div class="movieFromAPI mx-3">
                        <button class="btn btn-success" id="addMovie" onclick="addMovie(this)" data-movie-id=${grabID} class="mr-4 mt-3"><i class="far fa-heart"></i></button>
                        <img id="movieImg" src=${posterUrl + movie.poster_path} data-movie-id=${movie.id}/>
                    </div>`
        }
    }
    return renderMovie;
}

/*--------- Invoke API Requests ----------*/
getTrendingMovies();
searchMovies();