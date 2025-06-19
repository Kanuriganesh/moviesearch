let wishList = JSON.parse(localStorage.getItem("wishList")) || []

const resultEl = document.getElementById("resultContainer");  //It was nothing but to see the output of the searched movies 
let movieList = JSON.parse(localStorage.getItem("movieList")) 
if(wishList.length !== 0){
     renderThewhishList()
}
function DeleteTheMovie(id){   
    wishList = JSON.parse(localStorage.getItem("wishList")) || []
     if(wishList.length !== 0){
        console.log("having one")
         const indexvalue = wishList.findIndex(each=>{
             if(each.imdbID === id){
                 return true
             }
         }) 
         if(indexvalue >= 0){
               wishList.splice(indexvalue,1)  
               localStorage.setItem("wishList",JSON.stringify(wishList)) 
               renderThewhishList()
         }  
         else{
             resultEl.textContent = ''
         }
     }  
     else{   
         console.log("last element")
        resultEl.textContent = ''
     }  
     
     if(movieList.length !== 0){
        console.log("dlkfjdsklf")
         movieList = movieList.map((each)=>{
             if(each.imdbID === id){
                 return{
                     ... each, 
                     isWish:false
                 }
             }
             else{
                return each
             }
         })   
         localStorage.setItem("movieList",JSON.stringify(movieList))
     }   
     
}

function renderThewhishList(){
    const wishList = JSON.parse(localStorage.getItem("wishList")) || [];

    if (wishList.length === 0) {
        resultEl.innerHTML = "<p class='para'>No movies in wishlist.</p>";
        return;
    }

    let storageEl = '';
    wishList.forEach((eachMovie) => {
        const { Poster, Title, Year, Type, imdbID, isWish } = eachMovie;
        if (Poster) {
            storageEl += `    
                <div class="movieContainer">
                    <img src="${Poster}" alt="${Title}" class="poster"/>
                    <div class="subMovieContainer">
                        <h2 class="movieTitle">${Title}</h2>
                        <p class="movieMeta">${Year} • ${Type}</p>
                        <p class="movieDesc">Some description about ${Title}...</p>
                        <button class="watchlistBtn" onclick="DeleteTheMovie('${imdbID}')">
                            - Remove
                        </button>
                    </div>
                </div>
            `;
        }
    });

    resultEl.innerHTML = storageEl;
}

renderThewhishList()