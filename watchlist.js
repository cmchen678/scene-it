document.addEventListener("DOMContentLoaded", function(){
    var watchlist = localStorage.getItem("watchlist");

    function renderMovies(movieArray) {

        var finalHTML = movieArray.map(function(currentMovie) {
            var movieHTML = `
            <div class="movie card col-4" style="padding: 0">
                <div class="card-body">
                    <img class="card-img-top" src="${currentMovie.Poster}">
                    <h1 class="card-title">${currentMovie.Title}</h1>
                    <div class="card-text" style="color: white; background-color: gray; text-align: center; width: 50px; margin-bottom: 10px">${currentMovie.Year}</div>
                    <button onclick="saveToWatchlist(${currentMovie.imdbID})" style="width: 50px; background-color: blue; color: white; border-radius: 3px;">Add!</button>
                </div>
            </div>
            `
            return movieHTML;
        });

        return finalHTML.join("");

    };

    document.getElementById("movies-container").innerHTML = renderMovies(JSON.parse(watchlist));

});