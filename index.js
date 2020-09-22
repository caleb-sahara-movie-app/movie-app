const getUrl = 'https://stupendous-expensive-domain.glitch.me/movies';
const getMovies = () => fetch(getUrl)
    .then(res => res.json())
    .then(movies => movies[0].title)

getMovies()
    .then(data => {
        let movie = `${data}`;
    $('#result').html(movie);
}) ;

