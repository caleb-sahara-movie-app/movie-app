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
                            <button onclick="editMovie(this)" data-id=${movie.id}>Edit Movie</button>
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

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
})

const editMovie = () =>

    // <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //     <div class="modal-dialog">
    //         <div class="modal-content">
    //             <div class="modal-header">
    //                 <h5 class="modal-title" id="exampleModalLabel">New message</h5>
    //                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //                     <span aria-hidden="true">&times;</span>
    //                 </button>
    //             </div>
    //             <div class="modal-body">
    //                 <form>
    //                     <div class="form-group">
    //                         <label for="recipient-name" class="col-form-label">Recipient:</label>
    //                         <input type="text" class="form-control" id="recipient-name">
    //                     </div>
    //                     <div class="form-group">
    //                         <label for="message-text" class="col-form-label">Message:</label>
    //                         <textarea class="form-control" id="message-text"></textarea>
    //                     </div>
    //                 </form>
    //             </div>
    //             <div class="modal-footer">
    //                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //                 <button type="button" class="btn btn-primary">Send message</button>
    //             </div>
    //         </div>
    //     </div>
    // </div>


    fetch(`${getUrl}/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie) //convert json into a string to be placed in the body. Very important
})
    .then(res => res.json())

    .then(data => {
        console.log(`Success: edited ${JSON.stringify(data)}`);
        getMovies();
    })
    .catch(console.error);


/*---------- Event Listeners ---------*/
$('#addMovie').click((e) => {
    e.preventDefault()
    addMovie();
})


