const searchInput = document.getElementById("searchMovies");   //search element to search the movies 
const resultEl = document.getElementById("resultContainer");  //It was nothing but to see the output of the searched movies 
let movieList = []
let wishList = []
if (localStorage.getItem("movieList")) {
    movieList = JSON.parse(localStorage.getItem("movieList"))
    renderThesearchMovies()
}
async function findTheMoviesList(api) {
    const response = await fetch(api);
    const data = await response.json();
    let result = data?.Search;
    result = result.map(each => {
        return {
            ...each,
            isWish: false,
        }
    })
    if (result) {
        return result
    }
    else {
        localStorage.setItem("movieList", JSON.stringify([]));
        renderThesearchMovies()
        alert("API FAILED PLS ONCE CHECK")
    }
}
function AddToWhishlist(movie) {
    wishList = JSON.parse(localStorage.getItem("wishList")) || [];

    if (movie.isWished) {
        const alreadyExists = wishList.some(eachMovie => eachMovie.imdbID === movie.imdbID);

        if (!alreadyExists) {
            wishList.push(movie);
            localStorage.setItem("wishList", JSON.stringify(wishList));
        }
    } else {
        // If movie was un-wished, remove from wishList
        wishList = wishList.filter(each => each.imdbID !== movie.imdbID);
        localStorage.setItem("wishList", JSON.stringify(wishList));
    }
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("watchlistBtn")) {
        const movie = {
            Title: e.target.dataset.title,
            Year: e.target.dataset.year,
            Poster: e.target.dataset.poster,
            Type: e.target.dataset.type,
            imdbID: e.target.dataset.id,
            isWished: !JSON.parse(e.target.dataset.iswish)
        };
        if (movieList.length !== 0) {
            movieList = movieList.map((eachMovie) => {
                if (eachMovie.imdbID === movie.imdbID) {
                    return {
                        ...eachMovie,
                        isWish: !JSON.parse(e.target.dataset.iswish)
                    }
                }
                else {
                    return eachMovie
                }
            })
            localStorage.setItem("movieList", JSON.stringify(movieList))

        }
        console.log(wishList.length)
        console.log(JSON.parse(localStorage.getItem("wishList")))
        if (wishList.length !== 0) {
            const findIndex = wishList.indexOf(eachMovie => {
                if (eachMovie.imdbID === e.target.dataset.id) {
                    return true;
                }
            })
            console.log("dfksdjklfjlkdsjfkld", findIndex)
            // wishList.pop(findIndex)
            // localStorage.setItem("wishList",JSON.stringify(wishList))
        }
        renderThesearchMovies()
        AddToWhishlist(movie);
    }
});

function renderThesearchMovies() {
    searchInput.value = ''
    if (movieList.length !== 0) {
        let storageEl = ''
        movieList.map((eachMovie) => {
            const { Poster, Title, Year, Type, imdbID, isWish } = eachMovie

            if (Poster) {
                storageEl += `    
                    <div class="movieContainer">
                        <img src="${Poster}" alt="${Title}" class="poster"/>
                        <div class="subMovieContainer">
                            <h2 class="movieTitle">${Title}</h2>
                            <p class="movieMeta">${Year} • ${Type}</p>
                            <p class="movieDesc">Some description about ${Title}...</p>
                            <button class="watchlistBtn"  
                                data-title="${Title}"
                                data-year="${Year}"
                                data-poster="${Poster}"
                                data-type="${Type}"
                                data-id="${imdbID}"  
                                data-isWish="${isWish}"
                            > ${isWish ? "- Remove" : "+ Watchlist"}</button>
                        </div>
                    </div>
                `
            }
        })
        resultEl.innerHTML = storageEl
    }
}
searchInput.addEventListener("keyup", async function (event) {
    if (event.key === "Enter") {
        const movieName = searchInput.value
        if (movieName) {
            const API = `https://www.omdbapi.com/?s=${movieName}&apikey=4ab339ea`
            movieList = await findTheMoviesList(API)
            if (movieList.length !== 0) {
                localStorage.setItem("movieList", JSON.stringify(movieList))
            }
            renderThesearchMovies()

        }
        else {
            localStorage.setItem("movieList", JSON.stringify([]));
            alert("PLEASE ENTER THE MOVIE NAME")
        }
    }
})
async function searchTheMove() {
    const movieName = searchInput.value
    if (movieName) {
        const API = `https://www.omdbapi.com/?s=${movieName}&apikey=4ab339ea`
        movieList = await findTheMoviesList(API)
        if (movieList.length !== 0) {
            localStorage.setItem("movieList", JSON.stringify(movieList))
        }
        renderThesearchMovies()
    }
    else {
        alert("PLEASE ENTER THE MOVIE NAME")
    }
}