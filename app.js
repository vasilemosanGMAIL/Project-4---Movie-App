//URL valiables
const themoviedbURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=50cc2d929715507f8e887ec799afc87c&page=1";
const searchURL =
  "https://api.themoviedb.org/3/search/movie?&api_key=50cc2d929715507f8e887ec799afc87c&query=";
const imageURL = "https://image.tmdb.org/t/p/w1280";
//Search Variables
const movieButton = document.getElementById("search-btn");
const searchForm = document.getElementById("searchForm");
const movieTitle = document.getElementById("title1");
const movieImage = document.getElementById("logo");
const home = document.getElementById("home");
const populateMovie = document.getElementById("populateMovie");
//functions
document.addEventListener("DOMContentLoaded", getMovies(themoviedbURL));
movieButton.addEventListener("click", searchMovie);
home.addEventListener("click", getMovies(themoviedbURL));

// getMovies(themoviedbURL);

async function getMovies(linkURL) {
  try {
    const movielist = await fetch(linkURL);
    const movieData = await movielist.json();
    //console.log(movieData);
    // movieTitle.innerHTML = movieData.results[4].title;
    // movieImage.src = `${imageURL}${movieData.results[4].poster_path}`;
    movieData.results.forEach((element) => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const text = document.createElement("h5");

      div.className = "col-sm-4 my-2";
      text.innerHTML = `${element.title}`;
      img.src = `${imageURL}${element.poster_path}`;
      img.style = "max-width: 65%";
      img.alt = "alt";

      div.appendChild(img);
      div.appendChild(text);
      populateMovie.appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
}
//seach function
async function searchMovie() {
  try {
    const srch = searchForm.value;

    if (srch != "") {
      populateMovie.innerHTML = "";
      await getMovies(`${searchURL}${srch}`);
      searchForm.value = "";
    } else {
      populateMovie.innerHTML = "";
      await getMovies(themoviedbURL);
    }
  } catch (error) {
    console.log(error);
  }
}