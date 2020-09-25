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
                            <button onclick="editMovie(this)" data-title=${movie.title} data-genre=${movie.genre} data-rating=${movie.rating} data-id=${movie.id} data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Edit Movie</button>
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



const editMovie = (ele) => {
    let dataID = [($(ele).data('id')), ($(ele).data('title')), ($(ele).data('genre')), ($(ele).data('rating'))]

console.log(`The edit button with an id of ${dataID[0]}, is titled: ${dataID[1]}, it's genre is: ${dataID[2]}, and has a rating of ${dataID[3]} has been clicked`)

    // $('#exampleModal').on('show.bs.modal', function (event) {
    //     let button = $(event.relatedTarget) // Button that triggered the modal
    //     let recipient = button.data('whatever') // Extract info from data-* attributes
    //     // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    //     // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    //     var modal = $(this)
    //     modal.find('.modal-title').text('New message to ' + recipient)
    //     modal.find('.modal-body input').val(recipient)
    // })
// fetch(`${getUrl}/${id}`, {
//     method: 'PUT',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(movie) //convert json into a string to be placed in the body. Very important
// })
//     .then(res => res.json())
//
//     .then(data => {
//         console.log(`Success: edited ${JSON.stringify(data)}`);
//         getMovies();
//     })
//     .catch(console.error);
}

/*---------- Event Listeners ---------*/
$('#addMovie').click((e) => {
    e.preventDefault()
    addMovie();
})


