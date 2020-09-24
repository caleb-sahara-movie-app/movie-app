

    const getUrl = 'https://stupendous-expensive-domain.glitch.me/movies';
    const getMovies = () => fetch(getUrl)
        .then(res => res.json())
        // .then(movies => movies)
        .then(movies => {

            let renderMovie = ''
            for (let movie of movies) {
                renderMovie += `<li class="card">
                                         <p>${movie.title}</p>
                                         <p>${movie.id}</p>
                                         <button class="editMovie">Edit Movie</button>
                                         <button class="deleteMovie" onclick="$(this).DeleteMovie(${movie.id})" data-id=${movie.id}>Delete Movie</button></li>`
                $('#result').html(renderMovie)
            }
        })


    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
            $('#loader').remove()
            getMovies()
        }
    };


    /*------- Render to HTML when CREATED ----------*/
    let createMovie = (movieObj) => {
        let htmlStr = '';
        movieObj.forEach((movie) => {
            htmlStr += `<li class="card"> 
                    <p>${movie.title}</p>
                    <p>${movie.id}</p>
                    <button class="editMovie">Edit Movie</button>                     
                    <button class="deleteMovie" data-id=${movie.id}>Delete Movie</button></li>` //feeds the movie.id and attaches it to the button
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
                getMovies().then((movies) => {
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
            console.log(`Success: Deleted movie with id of ${id}`);
        })
        .catch(console.error);


    /*--------- Event Listeners --------*/
    $('#addMovie').click((e) => {
        e.preventDefault()
        addMovie();
    })


    $.fn.DeleteMovie = function(movieID) {
        console.log(movieID)
        deleteMovie(movieID)

        $('#result').html('')
        getMovies()

    }


