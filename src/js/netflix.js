const fila1 = document.querySelector('.contenedor-carrusel1');
const peliculas1 = document.querySelectorAll('.pelicula1');

const flechaIzquierda = document.getElementById('flechaIzquierda');
const flechaDerecha = document.getElementById('flechaDerecha');

let API_KEY = "2dbc6cfb9f0b204e19642c36f4bd9762";
let moviesTopRanked = [];
let imagesTopRanked = [];

var pelis;
//Scroll
function scrollLeft(){
    flechaDerecha.addEventListener('click', () =>{
        fila1.scrollLeft += fila1.offsetWidth;
        const indicadorActivo = document.querySelector('.indicadores .activo');
        if(indicadorActivo.nextSibling){
            indicadorActivo.nextSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
    });
}

function scrollRight(){
    flechaIzquierda.addEventListener('click', () =>{
        fila1.scrollLeft -= fila1.offsetWidth;
        const indicadorActivo = document.querySelector('.indicadores .activo');
        if(indicadorActivo.previousSibling){
            indicadorActivo.previousSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
    });
}

//hover
function hover(pelis){
    pelis.forEach((pelicula) =>{
        pelicula.addEventListener('mouseenter',(e) =>{
            const elemento = e.currentTarget;
            setTimeout(() =>{
                pelis.forEach(pelicula => pelicula.classList.remove('hover'));
                elemento.classList.add('hover');
            }, 300);
        });
    });
} 

function deshover(pelis){
    fila1.addEventListener('mouseleave',() =>{
        pelis.forEach(pelicula => pelicula.classList.remove('hover'));
    });
    
}
//paginacion
function pagination(pelis){
    const numeroPaginas = Math.ceil(pelis.length / 5);
    for(let i = 0; i<numeroPaginas;i++){
        const indicador1 = document.createElement('button');
        if(i === 0){
            indicador1.classList.add('activo');
        }
        document.querySelector('.indicadores').appendChild(indicador1);
        indicador1.addEventListener('click',(e) =>{
            fila1.scrollLeft = i * fila1.offsetWidth;
    
            document.querySelector('.indicadores .activo').classList.remove('activo');
            e.target.classList.add('activo');
        });
    }
}


//Obtener mejor rankeadas
async function getTopRanked(API_KEY){
    let moviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=es&page=1`;

    try {
        let response = await axios.get(moviesUrl);
        return response.data.results;
    } catch (e) {
        return [];
    }
}

getTopRanked(API_KEY).then((movies) => {
    let index = 0;
    for (let movie of movies) {
        moviesTopRanked[index] = movie;
        imagesTopRanked[index] = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

        index++;
    }
    console.log(moviesTopRanked);
    console.log(imagesTopRanked);

    fillImage(imagesTopRanked,1,"Mejores películas");
});

async function getGenres(API_KEY){
    let genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es`;

    try {
        let response = await axios.get(genresUrl);
        return response.data.genres;
    } catch (e) {
        return [];
    }
}

getGenres(API_KEY).then((genres) => {
    let index = 0;
    let genreObj= {};

    for (let genre of genres) {
        if(index == 0){
            genreObj.genero1 = genre;
        }else if(index == 1){
            genreObj.genero2 = genre;
        }
        else if(index ==2){
            genreObj.genero3 = genre;
        }
        else{
         break;
        }
        
        index++;
    }
    console.log(genreObj);

    //buscar peliculas por genero1
    getMoviesByGenre(API_KEY,genreObj.genero1).then((movies) => {
        let index = 0;
        let movieGenre1 =[];
        let movieGenre1Img = [];
        for (let movie of movies) {
            movieGenre1[index] = movie;
            movieGenre1Img[index] = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
    
            index++;
        }
        console.log(movieGenre1);
    console.log(movieGenre1Img);

    fillImage(movieGenre1Img,2,genreObj.genero1.name);

    });

    
   // fillImage(imagesTopRanked,2);
});

async function getMoviesByGenre(API_KEY,genre){
    let genreMovieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}`;

    try {
        let response = await axios.get(genreMovieUrl);
        return response.data.results;
    } catch (e) {
        return [];
    }
}

function fillImage(imagesFill,nCarousel,nameSection){

    let carousel;
    let divPeliculas;
    let ref;
    let newImage;
    console.log(nameSection);
    if(nCarousel === 1){
        carousel = document.getElementById('carousel1');

        for (let i = 0; i < 15; i++) {
            divPeliculas = document.createElement('div');    
            divPeliculas.classList.add('pelicula1');  
            ref = document.createElement('a');
            divPeliculas.appendChild(ref);
            newImage = document.createElement('img');
            newImage.src =imagesFill[i];
            newImage.alt = "Imagen "+ (i+1);
            divPeliculas.appendChild(newImage);
            carousel.appendChild(divPeliculas);
        }
    
    }
    else if(nCarousel === 2){
        carousel = document.getElementById('carousel2');
        for (let i = 0; i < 15; i++) {
            const genero1 = document.getElementById('genero1');
            genero1.innerHTML = nameSection;

            divPeliculas = document.createElement('div');    
            divPeliculas.classList.add('pelicula1');  
            ref = document.createElement('a');
            divPeliculas.appendChild(ref);
            newImage = document.createElement('img');
            newImage.src =imagesFill[i];
            newImage.alt = "Imagen "+ (i+1);
            divPeliculas.appendChild(newImage);
            carousel.appendChild(divPeliculas);
        }
    }
    //const carrusel1 = document.getElementById('carousel1');
    //const carrusel2 = document.getElementById('carousel2');


    pelis = document.querySelectorAll('.pelicula1');
   
    hover(pelis);
    deshover(pelis);
    pagination(pelis);
    scrollLeft();
    scrollRight();
}




