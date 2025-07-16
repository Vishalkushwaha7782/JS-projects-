const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

//Function to fetcch movie details using OMDB API
const getMovieInfo = async (movie) => {
    const MyAPIKey = "e63892d9"; 
    const url = `https://www.omdbapi.com/?apikey=${MyAPIKey}&t=${encodeURIComponent(movie)}`
    const response = await fetch(url);
    const data = await response.json();

    showMovieData(data)
};


// function to show movie details on screen

const showMovieData = (data)=>{
    movieContainer.innerHTML = ""
    const {Title, imdbRating,Released,Runtime,Actors,Plot,Poster,Genre} = data;
    

    const MovieElement = document.createElement('div')
    MovieElement.innerHTML = 
    `
        <h2>${Title}</h2>
        <p><strong>Rating : &#11088 </strong>${imdbRating}</p>
    `;

    const MovieGenreElement = document.createElement('div');
    MovieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p')
        p.innerText = element;
        MovieGenreElement.appendChild(p)
    });


    MovieElement.appendChild(MovieGenreElement)

    MovieElement.innerHTML += 
    `
        <p><strong>Released Date : &#11088 </strong>${Released}</p>
        <p><strong>Duration : </strong>${Runtime}</p>
        <p><strong>Cast : </strong>${Actors}</p>
        <p><strong>Plot : </strong>${Plot}</p>
    `;


    movieContainer.appendChild(MovieElement);
}



searchForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        getMovieInfo(movieName);
    }
    
})