const getUrl = 'https://stupendous-expensive-domain.glitch.me/movies';
const getMovies = () => fetch(getUrl)
    .then(res => res.json())
    .then(movies => {
        let renderMovie = ''
        for (let movie of movies) {
            renderMovie += `<li class="card">
                                         <p>${movie.title}</p>
                                         <p>${movie.id}</p>
                                         <button class="editMovie">Edit Movie</button>
                                         <button class="deleteMovie" data-id=${movie.id}>Delete Movie</button></li>`
            // <button class="deleteMovie" onclick="$(this).getMovieID(${movie.id})" data-id=${movie.id}>Delete Movie</button></li>`
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

const deleteMovie = (id) => fetch(`${getUrl}/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(() => {
        getMovies()
    })
    .catch(console.error);


/*--------- Event Listeners --------*/
$('#addMovie').click((e) => {
    e.preventDefault()
    addMovie();
})


// <button class="deleteMovie" onclick="$(this).getMovieID(${movie.id})"
// data-id=${movie.id}>Delete Movie</button></li>`
$.fn.getMovieID = function (movieID) {
    console.log(movieID)
    deleteMovie(movieID)
    // editMovie()
}


// $('.deleteMovie').each(function() {
//     $(this).click(function () {
//         // let movieId = $(this).data('data-id').val()
//         console.log('movieId')
//         // deleteMovie(movieId)
//     })
// })
//$('.deleteMovie').click($(this).getMovieID())

// $('.deleteMovie').click(function() {
//     var id = $(this).attr('data-id')
//     console.log(id)
// })

// $(document).ready(function () {
//     $('.deleteMovie').click(function () {
//         alert(this.data - id);
//     })
// })