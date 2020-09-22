const getUrl = 'https://stupendous-expensive-domain.glitch.me/movies';
const getMovies = () => fetch(getUrl)
    .then(res => res.json())
    .then(movies => movies)

getMovies()
    .then(movies => {
        for(let movie of movies) {
            $('#result').append(`${movie.title}<br>`)
        }
    })



