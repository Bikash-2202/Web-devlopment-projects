//Consts
const apikey =
  "17b5dab3748d8503461c420c939d9040"; /* This line declares a constant variable apikey and assigns a specific value to it. The API key is likely used to authenticate and access certain resources from the API service.*/

const apiEndPoint =
  "https://api.themoviedb.org/3"; /*This line declares a constant variable apiEndPoint and assigns the base URL for the API service.*/

const imgPath =
  "https://image.tmdb.org/t/p/original"; /*This line declares a constant variable `imgPath` and assigns the base URL for accessing movie images from the API service. */

/* Below line declares a constant object apiPaths, which contains various API endpoints for different actions, such as fetching all categories, fetching movies for a specific category, fetching trending movies, and searching on YouTube. */
const apiPaths = {
  fetchAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apikey}`,

  fetchMoviesList: (id) =>
    `${apiEndPoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,

  fetchTrending: `${apiEndPoint}/trending/movie/day?api_key=${apikey}&language=en-US`,

  searchOnYoutube: (query) =>
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyBna9QEpIYLVBflUlrEb9ibACp7YCzJMv4`,
};

//Boots up the app
/*This is the init function, which is responsible for booting up the app and initializing its initial state. It calls several other functions to fetch and build different sections of the app. */
function init() {
  fetchAndbuildMoviesSection(apiPaths.fetchTrending, "Trending Now");
  fetchAndBuildAllCategories();
  fetchTrendingMovie();
}

function fetchTrendingMovie() {
  fetchAndbuildMoviesSection(apiPaths.fetchTrending,"Trending Now") /*This line calls the fetchAndbuildMoviesSection function, passing two arguments: apiPaths.fetchTrending and "Trending Now". The apiPaths.fetchTrending is a URL that fetches the trending movies from the API, and the second argument is a string representing the category name, which is set to "Trending Now". */
    .then((list) => {
      const randomIndex = parseInt(Math.random() * list.length); /*This line generates a random index within the range of the list array. It multiplies a random number (between 0 and 1) generated by Math.random() with the length of the list array and then uses parseInt() to convert the result into an integer. This way, randomIndex will be a random integer between 0 (inclusive) and the length of the list array (exclusive) */
      buildBannerSection(
        list[randomIndex]
      ); /* This line calls the buildBannerSection function with the movie at the randomly generated randomIndex from the list. Essentially, it selects a random movie from the list and passes it as an argument to the buildBannerSection function. */
    }) /* This is a Promise chaining method. When the fetchAndbuildMoviesSection function is successful, it returns a Promise that resolves with a list of movies. The .then() method is chained to the Promise to handle the successful resolution of the Promise. It takes a callback function as an argument, which will be executed when the Promise is resolved. In this case, the callback function takes the list of movies as its argument. */
    .catch((err) => {
      console.error(err);
    }); /*This is another Promise chaining method. If there is an error in the previous Promise (i.e., the fetchAndbuildMoviesSection function fails to fetch the data), the Promise will be rejected, and the .catch() method will handle the error. It takes a callback function as an argument, which will be executed when the Promise is rejected, passing the err (error) as its argument.*/
}

function buildBannerSection(movie) {
  const bannerCont =document.getElementById("banner-section"); /*This line retrieves the DOM element with the id attribute "banner-section" and assigns it to the variable bannerCont. This element represents the container or section where the banner content will be displayed on the web page. */
  bannerCont.style.backgroundImage = `url('${imgPath}${movie.backdrop_path}')`; /*This line sets the backgroundImage CSS property of the bannerCont element. It uses the imgPath constant to construct the full URL for the backdrop image of the movie (movie.backdrop_path). The backdrop image is usually a large image representing the movie. */
  const div =document.createElement("div"); /* This line creates a new <div> element in the DOM and assigns it to the variable div. This new <div> will be used to hold the content for the banner section. */

  /*This(below) block of code sets the inner HTML content of the newly created <div>. It uses template literals (``) to create a multi-line string with placeholders for dynamic data from the movie object. */
  div.innerHTML = `<h2 class="banner_title">${movie.title}</h2>
  <p class="banner_info">Trending in movies | Released - ${movie.release_date} </p>
  <p class="banner_overview">${movie.overview}</p>
  <div class="action-buttons-cont">
  <button class="action-button">
    <i class="fa-solid fa-play"></i> &nbsp;&nbsp; Play
  </button>
  <button class="action-button">
    <i class="fa fa-circle-info"> </i> &nbsp;&nbsp; More Info
  </button>
</div>
<div class="banner-fadebottom"> </div>`;
  /*
   ${movie.title}: This placeholder will be replaced with the title of the movie.

  ${movie.release_date}: This placeholder will be replaced with the release date of the movie.

  ${movie.overview}: This placeholder will be replaced with the overview or summary of the movie. */

  div.className ="banner-content"; /*This line assigns the CSS class "banner-content" to the newly created <div>. This class likely defines the styling for the banner section content.*/

  bannerCont.appendChild(div); /*This line appends the newly created <div> containing the banner content as a child of the bannerCont element. This will display the movie title, release date, overview, and action buttons within the banner section on the web page */
}

function fetchAndBuildAllCategories() {
  fetch(apiPaths.fetchAllCategories) /*This line uses the fetch API to make a network request to the URL specified in apiPaths.fetchAllCategories. This URL is likely an API endpoint that fetches a list of all movie categories (genres). */
    .then((res) =>res.json()) /* This is the first Promise chaining method. When the fetch request is successful and the response is received, the .then() method is used to handle the response. It takes a callback function as its argument, which receives the response (res). The res.json() method is then called on the response to parse it as JSON data. This method returns another Promise.*/
    .then((res) => {
      /* This is the second Promise chaining method. When the JSON data is successfully parsed from the response, the .then() method is called again. It takes a callback function as its argument, which receives the JSON data (res) as its argument.*/

      const categories = res.genres; //This line extracts the genres array from the parsed JSON data (res) and assigns it to the variable categories. This array should contain information about different movie genres, such as action, drama, comedy, etc.
      if (Array.isArray(categories) && categories.length) {
        /* This condition checks if the categories array is not empty and is indeed an array. It ensures that there are genres available before proceeding further. */
        categories.forEach((category) => {
          /*This line starts a forEach loop to iterate over each genre in the categories array.
           */

          //Inside the loop, this line calls the fetchAndbuildMoviesSection() function. It passes two arguments to the function:

          fetchAndbuildMoviesSection(
            apiPaths.fetchMoviesList(category.id), // This is the URL for fetching movies for the specific genre (category.id). It likely fetches a list of movies for the given genre.
            category.name /*  This is the name of the genre. It will be used as a title for the section displaying movies of that genre.*/
          );
        });
      }
      // console.table(movies);
    });
}

function fetchAndbuildMoviesSection(fetchUrl, categoryName) {
  // console.log(fetchUrl, categoryName);
  return (
    fetch(fetchUrl) /*This line initiates a network request using the fetch API. It sends a GET request to the URL specified by the fetchUrl parameter. The fetchUrl is the URL of the API endpoint from which movies or movie data will be fetched. */
      .then((res) =>res.json()) /*This is the first Promise chaining method. When the fetch request is successful and the response is received, the .then() method is used to handle the response. It takes a callback function as its argument, which receives the response (res). Inside the callback function, res.json() is called on the response object to parse the response data as JSON. This method returns another Promise. */

      /*This is the first Promise chaining method. When the fetch request is successful and the response is received, the .then() method is used to handle the response. It takes a callback function as its argument, which receives the response (res). Inside the callback function, res.json() is called on the response object to parse the response data as JSON. This method returns another Promise. */
      .then((res) => {
        // console.table(res.results);
        const movies =res.results; /*This line extracts the results property from the parsed JSON data (res) and assigns it to the variable movies. The results property should contain an array of movie objects. */
        if (Array.isArray(movies) && movies.length) {
          /*This condition checks if the movies array is not empty and is indeed an array. It ensures that there are movies available before proceeding further*/
          buildMoviesSection(movies, categoryName);
          /*buildMoviesSection() function, passing two arguments to the function:
        movies: This is the array of movie objects fetched from the API. It contains information about the movies to be displayed.

        categoryName: This is the name of the category (genre) to which the movies belong. It will be used as a title for the section displaying the movies. */
        }
        return movies; /* After building the movies section, the function returns the movies array. If there are movies available, the movies array will contain the movie objects fetched from the API. If there are no movies available or any error occurs during the fetch process, the movies array will be empty */
      })
      .catch((err) => console.error(err))
  );
  /*This is the catch method of the Promise. If there is an error during the fetch operation or parsing of the JSON data, the Promise will be rejected, and the catch method will handle the error. It takes a callback function as its argument, which will receive the error (err) as its argument. Inside the callback function, the error is logged to the console using console.error(err) */
}

function buildMoviesSection(list, categoryName) {
  console.log(list, categoryName);
  const moviesCont =document.getElementById("movies-cont"); /*This line retrieves the DOM element with the id attribute "movies-cont" and assigns it to the variable moviesCont. This element represents the container where the movies section content will be displayed on the web page. */

  /*Below line uses the map() method to iterate over each item (movie) in the list array. It returns an array of strings, each containing the HTML code for a single movie item. The map() function processes each movie object in the list array and creates an HTML structure for each movie item. After mapping, the join("") method is used to join all the HTML strings together into a single string, moviesListHtml. */
  const moviesListHtml = list.map((item) => {
      return ` <div class="movie-item" onmouseenter ="searchMovieTrailer('${item.title}',  'yt${item.id}')" >
      <img class="movie-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}" />
      <div class="iframe-wrap" id="yt${item.id}"></div>
      </div>`;
    })
    .join("");

  /*Below line creates a string moviesSectionHtml, which contains the HTML structure for the entire movies section for the given category (categoryName). It includes the category name, a "Explore All" link, and the moviesListHtml`, which contains the HTML for all the movie items. */
  const moviesSectionHtml = `  <div class="movies-section">
    <h2 class="movie-section-heading">${categoryName} <span class="explore">Explore All <i class="fas fa-angles-right"></i> </span></h2>
    <div class="movies-row">${moviesListHtml}
     </div>
     </div> `;

  const div = document.createElement("div");
  div.className = "movies-section";
  div.innerHTML = moviesSectionHtml;

  //append html into movies container
  moviesCont.appendChild(div);

  // console.log(moviesSectionHtml);
}

function searchMovieTrailer(movieName) {
  if (!movieName) return;
  fetch(apiPaths.searchOnYoutube(movieName))
    .then((res) => res.json())
    .then((res) => {
      const bestResult = res.items[0];
      const youtubeUrl = `https://www.youtube.com/watch?v=${bestResult.id.videoId}`;
      console.log(youtubeUrl);
      const elements = document.getElementById("iframeId");
      const div = document.createElement("div");
      div.innerHTML = `<iframe width="245px" height="150px" src="https://www.youtube.com/embed/${bestResult.id.videoId}?autoplay=1&controls=0"></i frame>`;
      elements.append(div);
    })
    .catch((err) => console.log(err));
}

/*Below is a  event listener listens for the "load" event on the window object. The "load" event is triggered when all resources (HTML, CSS, images, etc.) on the page have finished loading. When the "load" event is triggered, the provided anonymous function is executed. Inside this function, two main actions are performed: */

window.addEventListener("load", function () {
  init(); /*The init() function is called. This function is the entry point of the app and is responsible for initializing the application. It is likely responsible for fetching and building the initial content of the app. */

  window.addEventListener("scroll", function () {
    //updating header UI
    const header = document.getElementById("header");
    const headerCont = document.getElementById("header-container");
    if (window.scrollY > 5) {
      header.classList.add("black-bg");
      headerCont.classList.add("box-shadow");
    } else {
      header.classList.remove("black-bg");
      headerCont.classList.remove("box-shadow");
    }
  });

  /*Another event listener is attached within the "load" event listener. This new event listener listens for the "scroll" event on the window object. The "scroll" event is triggered when the user scrolls the page. When the "scroll" event is triggered, the provided anonymous function is executed.

Inside this function, the variables header and headerCont are assigned the corresponding DOM elements with the IDs "header" and "header-container", respectively. These elements represent the header section of the web page.

The condition if (window.scrollY > 5) checks if the vertical scroll position (Y-axis) is greater than 5 pixels from the top of the page. If true, it means the user has scrolled down the page, and the following actions are performed:

header.classList.add("black-bg");: The CSS class "black-bg" is added to the header element. This class likely defines a black background color for the header, giving it a visual effect as the user scrolls down.

headerCont.classList.add("box-shadow");: The CSS class "box-shadow" is added to the headerCont element. This class likely defines a box shadow effect for the header container, adding a visual shadow effect when the user scrolls down.

If the condition if (window.scrollY > 5) is not met (i.e., the user has not scrolled down more than 5 pixels), the else block is executed, and the following actions are performed:

header.classList.remove("black-bg");: The CSS class "black-bg" is removed from the header element. This reverts the header's background color to its default style.

headerCont.classList.remove("box-shadow");: The CSS class "box-shadow" is removed from the headerCont element. This removes the box shadow effect from the header container. */
});
