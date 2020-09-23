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
                    $('#result').append(`<li>${movie.title}</li>`)
                }
            })
    }
};

let createMovie = (movieObj) => {
    let htmlStr = '';
    movieObj.forEach((movie) => {
        htmlStr += `<li>${movie.title}</li>`
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

$('#addMovie').click((e) => {
    e.preventDefault()
    addMovie();
})

// $('#deleteMovie').click(e) => {
//     e.preventDefault()
//     deleteMovie();
// }
