'use strict';

const getUrl = 'https://stupendous-expensive-domain.glitch.me/movies';
const getMovies = () => fetch(getUrl)
    .then(res => res.json())
    .then(movies => {
        let renderMovie = ''
        for (let movie of movies) {
            let grabTitle = movie.title;
            renderMovie += `<li class="card">
                            <p>${movie.title}</p>
                            <p>${movie.id}</p>
                            <button onclick="editMovie(this)" data-title="${grabTitle}" data-genre=${movie.genre} data-rating=${movie.rating} data-id=${movie.id} data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Edit Movie</button>
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
    console.log($(ele).data())

    let editModal = ''
    editModal +=
        `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">What would you like to edit?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="w-100">
                    <div class="form-group m-3">
                        <label for="title-name" class="col-form-label">Title:</label>
                        <textarea class="form-control" id="title-type">${dataID[1]}</textarea>
                    </div>
                    <div class="form-group m-3">
                        <label for="genre-type" class="col-form-label">Genre:</label>
                        <textarea class="form-control" id="genre-type">${dataID[2]}</textarea>
                    </div>
                    <div class="form-group m-3">
                        <label for="rating-change" class="col-form-label">Rating:</label>
                        <select class="form-control" id="rating-change">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Send message</button>
            </div>
        </div>
    </div>
</div>`
    $('.putModal').html(editModal)


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


