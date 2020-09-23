const getUrl = 'https://stupendous-expensive-domain.glitch.me/movies';
const getMovies = () => fetch(getUrl)
    .then(res => res.json())
    .then(movies => movies)

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        $('#loader').remove()
        getMovies()
            .then(movies => {
                for(let movie of movies) {
                    $('#result').append(`<li class="card"> 
                                         <p>${movie.title}</p>
                                         <p>${movie.id}</p>
                                         <button class="editMovie">Edit Movie</button>
                                         <button class="deleteMovie">Delete Movie</button></li`)
                }
            })
    }
};

/*------- Render to HTML ----------*/
let createMovie = (movieObj) => {
    let htmlStr = '';
    movieObj.forEach((movie) => {
        htmlStr += `<li class="card"> 
                    <p>${movie.title}</p>
                    <p>${movie.id}</p>
                    <button class="editMovie">Edit Movie</button>                     
                    <button class="deleteMovie">Delete Movie</button></li>`
    })
    return htmlStr
}


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
                getMovies().then((movies)=> {
                    $('#result').html(createMovie(movies))
                })
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
        console.log(`Success: deleted dog with id of ${id}`);
    })
    .catch(console.error);

/*--------- Event Listeners --------*/
$('#addMovie').click((e) => {
    e.preventDefault()
    addMovie();
})

// var test = function () {
//     console.log('hey');
//}
$('.deleteMovie').click((e) => {
    e.preventDefault()
    console.log('hey')
})

