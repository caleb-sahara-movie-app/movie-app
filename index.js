'use strict';

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

const editMovies = movie => fetch(`${getUrl}/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie) //convert json into a string to be placed in the body. Very important
})
    .then(res => res.json())
    .then(data => {
        console.log(`Success: edited ${JSON.stringify(data)}`);
    })
    .catch(console.error);


/*---------- Event Listeners ---------*/
$('#addMovie').click((e) => {
    e.preventDefault()
    addMovie();
})


