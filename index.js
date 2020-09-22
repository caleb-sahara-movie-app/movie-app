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
                    $('#result').append(`${movie.title}<br>`)
                }
            })
    }
};


