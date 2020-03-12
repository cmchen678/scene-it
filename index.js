document.addEventListener("DOMContentLoaded", function() {
    function renderMovies(movieArray) {

        var finalHTML = movieArray.map(function(currentMovie) {
            var movieHTML = `
            <div class="movie card col-4" style="padding: 0">
                <div class="card-body">
                    <img class="card-img-top" src="${currentMovie.Poster}">
                    <h1 class="card-title">${currentMovie.Title}</h1>
                    <div class="card-text" style="color: white; background-color: gray; text-align: center; width: 50px; margin-bottom: 10px">${currentMovie.Year}</div>
                    <button onclick="saveToWatchlist('${currentMovie.imdbID}')" style="width: 50px; background-color: blue; color: white; border-radius: 3px;">Add!</button>
                </div>
            </div>
            `
            return movieHTML;
        });

        return finalHTML.join("");

    };

    document.getElementById("search-form").addEventListener("submit", function(e) {
        e.preventDefault();

        var searchString = document.getElementById("search-form").value; //search input comes out as undefined
        var urlEncodedSearchString = encodeURIComponent(searchString);
        axios.get("http://www.omdbapi.com/?apikey=383c138&s=" + urlEncodedSearchString).then(function(response) {
            document.getElementById("movies-container").innerHTML = renderMovies(response.data.Search);
        });
    })
});

function saveToWatchlist(imdbID) {
    var movie = movieData.find(function(currentMovie){ 
        return currentMovie.imdbID == imdbID; 
    });
    var watchlistJSON = localStorage.getItem('watchlist');
    var watchlist = JSON.parse(watchlistJSON);
    if (watchlist === null) {
        watchlist = [];
    }
    watchlist.push(movie);
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', watchlistJSON);
};